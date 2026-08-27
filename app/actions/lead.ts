"use server";

/* THE LEAD HANDOFF. Every form on this site posts through here and nowhere else.
 *
 * Until now `QuoteForm` carried `action="/free-design-consultation" method="get"`, which is to say
 * it did nothing: it navigated to a page and dropped the answers in the query string. HANDOFF.md
 * has said "Forms are not wired" since the site was built. They are now.
 *
 * WHY A SERVER ACTION AND NOT A BROWSER POST. The obvious alternative is fetching the webhook
 * straight from the page, which is how most LeadConnector embeds work. Three reasons not to:
 *
 *   the URL stays off the client   a webhook trigger is a write-only endpoint with no auth on it.
 *                                  In the browser bundle it is public, and anyone who views source
 *                                  can post junk leads into the client's CRM for as long as the URL
 *                                  lives. Server-side it never reaches the page.
 *   it works without JavaScript    a Server Action attached to <form action={...}> submits as a
 *                                  real form post when scripts fail. A fetch handler does not.
 *   errors are ours to handle      a cross-origin fetch either succeeds opaquely or throws CORS,
 *                                  and neither tells a homeowner whether their number arrived.
 *
 * THIS REQUIRES A NODE RUNTIME AT DEPLOY. The site prerenders 78 pages, but it is not a static
 * export - there is no `output: "export"` in next.config.ts - so this is fine on Vercel or any Node
 * host. If anyone ever switches it to a static export, every form on the site goes dead silently.
 * That is the one thing to know before changing the deploy target.
 *
 * ONE ENDPOINT, PINNED IN CODE, AND NO ENVIRONMENT OVERRIDE. That last part is deliberate and it
 * is a reversal.
 *
 * This used to read `process.env.LEAD_WEBHOOK_URL ?? <constant>`, which I added so the endpoint
 * could be rotated without a deploy. The problem is what it does to a promise: the instruction is
 * that every form on the site posts to one specific webhook, and with an env override in front of
 * the constant that is not something the codebase can guarantee. A stale LEAD_WEBHOOK_URL left set
 * in the hosting project would silently win over the URL written here, on production only, with
 * nothing in the repo to show it. Grepping the code would say one thing and the leads would go
 * somewhere else.
 *
 * So the constant is the single source of truth. Rotating means editing this line, which is a
 * one-line change and a deploy, and is exactly what happened both times it has been rotated.
 *
 * Rotated 2026-08-27. The previous endpoint was 3uFcpA4cPE48TA2iiaA6/b9e6ee0f; the test leads
 * sitting in that account came from this form.
 */

const WEBHOOK =
  "https://services.leadconnectorhq.com/hooks/rkBM51eyu0Wdw5HGwEHs/webhook-trigger/aa8db861-941b-4e3d-8ef2-892290a9356b";

export type LeadState = { ok: boolean; message: string } | null;

const OK =
  "Thanks, we have got it. We reply the same day, and the design walk-around is booked from there.";
const FAIL =
  "Something went wrong sending that. Please call us on 402-810-3973 and we will pick it up straight away.";

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const get = (k: string) => (formData.get(k) ?? "").toString().trim();

  /* THE HONEYPOT, AND THE BUG IT CAUSED. Read this before touching the field name.
   *
   * A field no human sees and every naive bot fills in. It returns the SUCCESS state rather than an
   * error, and posts nothing: telling a bot it failed is telling it to try again with different
   * input.
   *
   * IT WAS CALLED `company`, AND THAT ATE REAL LEADS. Chrome autofill and every password manager
   * match on the field name, id and label - "company", "organization", "org" - and they fill it
   * whether or not it is off-screen, whether or not `autocomplete="off"` is set, and whether or not
   * it is out of the tab order. Anyone whose browser has an employer saved, which is most people
   * who have ever completed a business form, silently tripped the trap. They saw "Thanks, we have
   * got it." Nothing was posted. Nothing was logged, because the log line used to sit inside the
   * try below, after this return - so the runtime log for a swallowed lead was byte-identical to
   * the log for no submission at all. That is the whole reason it survived: every observable
   * signal, on both sides of the wire, said success.
   *
   * Diagnosed 27 Aug 2026 from the runtime log: `POST /index 200 [serverless]` with no `[lead]`
   * line under it, which is only reachable through this early return.
   *
   * THE NAME IS NOW MEANINGLESS ON PURPOSE. `ref_ck` matches no autofill heuristic in any browser,
   * so nothing offers to fill it. Do not rename it back to anything a human field could be called.
   * A bot that fills every input still fills it, which is the only thing it was ever for. */
  if (get("ref_ck")) {
    console.warn(`[lead] honeypot rejected ${get("form") || "form"} from ${get("page") || "?"} - nothing posted`);
    return { ok: true, message: OK };
  }

  const name = get("name");
  const phone = get("phone");
  if (!name || !phone) {
    return { ok: false, message: "We need a name and a phone number to call you back." };
  }

  /* LeadConnector maps inbound webhook fields by key, so the common contact keys are sent under the
   * names it already knows (first_name, last_name, email, phone, address1, city) and everything
   * else rides alongside for the automation to pick up. Sending `name` as well as the split pair
   * costs nothing and saves a mapping step if the split is ever wrong. */
  const [first, ...rest] = name.split(/\s+/);
  const payload = {
    name,
    first_name: first,
    last_name: rest.join(" "),
    phone,
    email: get("email"),
    /* `address` replaced both the old city select and the `full` variant's separate street input.
     * It still goes out as address1, which is the key LeadConnector already maps. `city` is only
     * present now when the page itself knew the town, so it is sent when it exists and omitted
     * when it does not, rather than posting an empty string over a good value. */
    address1: get("address"),
    city: get("city"),
    lighting_scope: get("scope"),
    notes: get("note"),
    source: "brytrco.com",
    page: get("page"),
    form_variant: get("form"),
    submitted_at: new Date().toISOString(),
  };

  /* SAY WHERE THE LEAD WENT, in the runtime log.
   *
   * A misrouted webhook is invisible from the outside: if the URL is wrong but still valid, the
   * homeowner sees "Request received", the action sees a 2xx, and the lead lands in somebody else's
   * account with nothing anywhere to show it. That is exactly the failure that just happened and it
   * cost a round trip to diagnose, because the only place the truth existed was the CRM inbox.
   *
   * One line per submission, in the Vercel runtime log. The hook id only, never the trigger secret
   * and never the homeowner's details. */
  const hookId = WEBHOOK.split("/hooks/")[1]?.split("/")[0] ?? "unknown";
  /* OUTSIDE THE TRY, AND ABOVE EVERY EARLY RETURN THAT MATTERS. It used to be the first statement
   * inside the try, which meant the two paths that drop a lead - the honeypot and the missing-field
   * check - left no trace at all. A log line that only prints on the happy path cannot tell you
   * that the happy path was not taken. */
  console.info(`[lead] posting ${get("form") || "form"} from ${get("page") || "?"} to hook ${hookId}`);

  try {
    const res = await fetch(WEBHOOK, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    /* A lead that did not arrive must never render as one that did. The homeowner is told to phone
     * instead, which is a real fallback rather than an apology. */
    if (!res.ok) {
      console.error(`[lead] webhook responded ${res.status} ${res.statusText}`);
      return { ok: false, message: FAIL };
    }
    /* WHAT LEADCONNECTOR SAYS BACK, IN THE LOG. A 2xx is not proof the workflow ran. While an
     * inbound trigger is still capturing sample data it answers "Success: test request received"
     * with no id and executes nothing; a live trigger answers "Success: request sent to trigger
     * execution server" WITH an id. Both are 200, and the difference is the difference between a
     * lead in the CRM and a lead nowhere. Truncated, because the body is not ours to store. */
    const echo = (await res.text().catch(() => "")).slice(0, 200);
    console.info(`[lead] hook ${hookId} replied ${res.status}: ${echo}`);
    return { ok: true, message: OK };
  } catch (err) {
    console.error("[lead] webhook post failed", err);
    return { ok: false, message: FAIL };
  }
}
