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
 * THE URL IS A DEFAULT, NOT A SECRET. `.env*` is gitignored here, so an env-only value would leave
 * the deploy broken until somebody remembered to set it. It reads LEAD_WEBHOOK_URL first so it can
 * be moved or rotated without a code change, and falls back to the endpoint the client supplied.
 */

const WEBHOOK =
  process.env.LEAD_WEBHOOK_URL ??
  "https://services.leadconnectorhq.com/hooks/3uFcpA4cPE48TA2iiaA6/webhook-trigger/b9e6ee0f-3a3f-423e-83d7-117bbc752aa3";

export type LeadState = { ok: boolean; message: string } | null;

const OK =
  "Thanks — we have got it. We reply the same day, and the design walk-around is booked from there.";
const FAIL =
  "Something went wrong sending that. Please call us on 402-810-3973 and we will pick it up straight away.";

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const get = (k: string) => (formData.get(k) ?? "").toString().trim();

  /* THE HONEYPOT. A field no human sees and every naive bot fills in. It returns the SUCCESS state
   * rather than an error, and posts nothing: telling a bot it failed is telling it to try again
   * with different input. This matters more than it did an hour ago, because the endpoint behind
   * this is now real and points at the client's CRM. */
  if (get("company")) return { ok: true, message: OK };

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
    address1: get("street"),
    city: get("city"),
    lighting_scope: get("scope"),
    notes: get("notes"),
    source: "brytrco.com",
    page: get("page"),
    form_variant: get("form"),
    submitted_at: new Date().toISOString(),
  };

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
    return { ok: true, message: OK };
  } catch (err) {
    console.error("[lead] webhook post failed", err);
    return { ok: false, message: FAIL };
  }
}
