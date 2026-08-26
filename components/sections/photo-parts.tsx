import Image from "next/image";
import Link from "next/link";
import { images } from "@/content/images";

/* PHOTOGRAPH SECTIONS.
 *
 * The client, looking at a page that was correct and unreadable: "images need to be used
 * through all of these other pages ... this here is not how pages should be with no images
 * and just a bunch of text."
 *
 * He was looking at a page with exactly one photograph on it — the hero — followed by four
 * thousand words. That was true of almost every page on the site. Twenty of the twenty-four
 * templates carried a single image, and it was always the hero, so once a reader scrolled past
 * the fold the site became a document.
 *
 * The fix is not "add a photo to each page", because the failure mode there is obvious and I
 * have seen it a hundred times: the same wide band, in the same place, on every page, which is
 * decoration and reads as filler. So this file is a VOCABULARY of five ways a photograph can
 * carry a section, and the rule is that a template picks the one that does work its text
 * cannot, and that no two consecutive sections on a page use the same one.
 *
 *   PhotoBand    one photograph at full width with a caption rail. Use where the text needs
 *                interrupting and the picture is worth a whole section on its own.
 *   PhotoSplit   photograph beside prose, side alternating down the page. The workhorse.
 *   PhotoPair    two photographs that only mean something together — day against night,
 *                warm white against a colour scene, the same house in two states.
 *   PhotoStrip   three or four photographs in a row with short captions. Range, not detail.
 *   PhotoAside   a portrait photograph as the tall column beside a list or a table.
 *
 * All five read from the manifest in content/images.ts by key, so a photograph can never
 * appear with alt text written for a different picture, and a slot with no file renders
 * nothing at all rather than a grey box.
 */

const slot = (key: string) => {
  const s = images[key];
  return s?.src ? { ...s, src: s.src } : null;
};

/* A caption rail, the same object as the one under the tier cards and the spec sheets, so a
 * photograph reads as part of this site rather than as a stock image dropped in. */
function Rail({ label, note }: { label: string; note?: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-on-dark/12 px-6 py-4">
      <p className="label flex items-center gap-3 text-on-dark">
        <span className="block h-4 w-1 bg-accent" aria-hidden />
        {label}
      </p>
      {note ? <p className="text-sm text-on-dark-muted">{note}</p> : null}
    </div>
  );
}

/* ── ONE PHOTOGRAPH, FULL WIDTH ── */
export function PhotoBand({
  photo, label, caption, note, wide = false, ground = "raise",
}: {
  photo: string;
  label: string;
  caption: string;
  note?: string;
  /** 21/9 rather than 16/9 — for the aerial and the long ranch elevations */
  wide?: boolean;
  ground?: "raise" | "primary" | "muted";
}) {
  const s = slot(photo);
  if (!s) return null;
  const bg = ground === "muted" ? "bg-muted" : ground === "primary" ? "bg-primary" : "bg-raise";
  return (
    <section className={`section ${bg}`}>
      <div className="shell">
        <figure className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10">
          <Rail label={label} note={note} />
          <div className={`relative ${wide ? "aspect-21/9" : "aspect-video"}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1440px) 1376px, 100vw" className="object-cover" />
          </div>
          <figcaption className="border-t border-on-dark/12 px-6 py-4 text-sm leading-relaxed text-on-dark-muted">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ── PHOTOGRAPH BESIDE PROSE ── */
export function PhotoSplit({
  photo, title, children, side = "left", link, ground = "card", tall = false,
}: {
  photo: string;
  title: string;
  children: React.ReactNode;
  /** which side the photograph sits on — alternate it down a page */
  side?: "left" | "right";
  link?: { href: string; label: string };
  ground?: "card" | "muted" | "raise" | "primary";
  /** portrait photographs get a taller frame rather than a bad crop */
  tall?: boolean;
}) {
  const s = slot(photo);
  if (!s) return null;
  const dark = ground === "raise" || ground === "primary";
  const bg = { card: "bg-card", muted: "bg-muted", raise: "bg-raise", primary: "bg-primary" }[ground];
  const pic = (
    <figure className={`overflow-hidden rounded-lg shadow-[var(--shadow-dark)] ${side === "right" ? "lg:order-2" : ""}`}>
      <div className={`relative ${tall ? "aspect-3/4" : "aspect-4/3"}`}>
        <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
      </div>
    </figure>
  );
  return (
    <section className={`section ${bg}`}>
      {/* ASYMMETRIC, NOT HALVES. measured-profile.md: splits run 0.9fr/1.1fr or 1.05fr/0.95fr and
        alternate direction. A plain 50/50 is the shape every generated page uses, and two equal
        columns give the eye nothing to enter the section by. */}
      <div className={`shell grid items-center gap-9 lg:gap-14 ${side === "right" ? "lg:grid-cols-[1.1fr_0.9fr]" : "lg:grid-cols-[0.9fr_1.1fr]"}`}>
        {pic}
        <div>
          <h2
            className={`display-section ${
 dark ? "text-on-dark" : "text-foreground"
            }`}
          >
            {title}
          </h2>
          <div
            className={`mt-5 space-y-4 text-[1.05rem] leading-relaxed ${
 dark ? "text-on-dark/85" : "text-muted-foreground"
            }`}
          >
            {children}
          </div>
          {link ? (
            <div className={`mt-7 border-t pt-5 ${dark ? "border-on-dark/15" : "border-border"}`}>
              <Link
                href={link.href}
                className={`u text-sm underline decoration-accent decoration-2 underline-offset-4 ${
 dark ? "text-on-dark" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── TWO PHOTOGRAPHS THAT ONLY MEAN SOMETHING TOGETHER ── */
export function PhotoPair({
  a, b, aLabel, bLabel, title, lede, ground = "muted",
}: {
  a: string;
  b: string;
  aLabel: string;
  bLabel: string;
  title: string;
  lede: string;
  ground?: "muted" | "card" | "raise";
}) {
  const A = slot(a);
  const B = slot(b);
  if (!A || !B) return null;
  const dark = ground === "raise";
  const bg = { muted: "bg-muted", card: "bg-card", raise: "bg-raise" }[ground];
  return (
    <section className={`section ${bg}`}>
      <div className="shell">
        <h2
          className={`display-section max-w-[34ch] ${
 dark ? "text-on-dark" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        <p className={`mt-5 max-w-[62ch] text-[1.05rem] leading-relaxed ${dark ? "text-on-dark/85" : "text-muted-foreground"}`}>
          {lede}
        </p>
        <div className="mt-9 grid gap-5 md:grid-cols-2">
          {[
            [A, aLabel],
            [B, bLabel],
          ].map(([s, l]) => {
            const sl = s as NonNullable<ReturnType<typeof slot>>;
            return (
              <figure
                key={l as string}
                className="overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10"
              >
                <div className="relative aspect-video">
                  <Image src={sl.src} alt={sl.alt} fill sizes="(min-width: 768px) 46vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="flex items-baseline gap-3 border-t border-on-dark/12 px-5 py-3.5">
                  <span className="block h-4 w-1 shrink-0 bg-accent" aria-hidden />
                  <span className="text-sm leading-relaxed text-on-dark">{l as string}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── A ROW OF PHOTOGRAPHS ── */
export function PhotoStrip({
  shots, title, lede, ground = "raise", cols, frame = "4/3",
}: {
  /* `scene` turns a strip into a SEQUENCE. See the note above the render. */
  shots: { photo: string; caption: string; scene?: string }[];
  title: string;
  lede?: string;
  ground?: "raise" | "muted" | "card";
  /** defaults to however many shots survive the manifest */
  cols?: 2 | 3 | 4 | 5;
  /* ONE ASPECT FOR THE WHOLE ROW, and this is not a preference.
   *
   * The library is a mix of drone frames and the crew's phone photographs, so orientations mix
   * inside a single strip. The first build of this let each figure keep its own aspect, and a
   * row containing one portrait and two landscape frames put a 3/4 image beside two 4/3 ones:
   * the grid stretched every card to the tallest, the two shorter images stayed their own
   * height, and each ended up with a caption floating in a hundred and fifty pixels of empty
   * card. Blank space is the thing this site is least allowed to have, and I had generated it
   * mechanically on eleven service pages and eighteen city pages at once.
   *
   * So a strip normalises. A portrait frame gets cropped to fit the row rather than being
   * allowed to set the row's height — and where a portrait photograph is the point rather than
   * one of several, it belongs in PhotoSplit with `tall` or in PhotoAside, both of which are
   * built for it. */
  frame?: "4/3" | "3/4" | "16/9";
}) {
  const live = shots.map((s) => ({ ...s, s: slot(s.photo) })).filter((x) => x.s);
  if (live.length < 2) return null;
  /* A sequence is a set whose shots name their own variable. Nothing else changes behaviour. */
  const seq = live.some((x) => x.scene);
  const dark = ground === "raise";
  const bg = { raise: "bg-raise", muted: "bg-muted", card: "bg-card" }[ground];
  const n = cols ?? Math.min(4, live.length);
  /* Five across is the filmstrip, and it exists for exactly one set: the five frames shot from
   * a stationary drone inside ninety seconds. A row of five reads as consecutive in a way that
   * a grid of two-plus-three does not, and consecutive is the entire claim. */
  const grid =
    n === 2
      ? "sm:grid-cols-2"
      : n === 3
        ? "sm:grid-cols-2 lg:grid-cols-3"
        : n === 5
          ? "sm:grid-cols-2 lg:grid-cols-5"
          : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <section className={`section ${bg}`}>
      <div className="shell">
        <h2
          className={`display-section max-w-[36ch] ${
 dark ? "text-on-dark" : "text-foreground"
          }`}
        >
          {title}
        </h2>
        {lede ? (
          <p className={`mt-5 max-w-[64ch] text-[1.05rem] leading-relaxed ${dark ? "text-on-dark/85" : "text-muted-foreground"}`}>
            {lede}
          </p>
        ) : null}
        {/* WHEN THE FRAME NEVER MOVES, SAY SO. The client on the three-up of one west Omaha
          * house at three settings: "I don't think this section with the images is very clear.
          * When I look at it I think I'm just seeing a bunch of duplicated images."
          *
          * That is the section failing at exactly the thing it was built to prove. Three frames
          * from a stationary drone, ninety seconds apart, differing only in what the controller
          * was told to do - the sameness is the entire argument, and with nothing saying so it
          * reads as the same photograph pasted three times. The differences live in a thin band
          * along the roofline, which at a third of the shell width is a few pixels tall.
          *
          * Two fixes, and neither is a new photograph. The set is numbered, so the eye is told it
          * is looking at a sequence before it looks for a difference. And each frame is titled
          * with the ONE VARIABLE, at bold display size above its caption, so the difference is
          * read rather than hunted for. The constant goes in a line under the lede.
          *
          * Only strips whose shots carry `scene` get this. On the city and most service pages the
          * frames are different houses and numbering them would invent a sequence. */}
        {seq && (
          <p className={`mt-4 flex items-center gap-2.5 text-[0.95rem] font-semibold ${dark ? "text-on-dark" : "text-foreground"}`}>
            <span className="run-node-inline" aria-hidden />
            The same house, the same frame, the same evening. Only the setting changes.
          </p>
        )}
        <div className={`mt-9 grid gap-5 ${grid}`}>
          {live.map(({ caption, scene, s }, i) => {
            const sl = s as NonNullable<ReturnType<typeof slot>>;
            return (
              <figure
                key={sl.src}
                className={`flex flex-col overflow-hidden rounded-lg shadow-[var(--shadow-dark)] ${
 dark ? "bg-primary ring-1 ring-on-dark/10" : "bg-card"
                }`}
              >
                <div
                  className={`relative ${
 frame === "3/4" ? "aspect-3/4" : frame === "16/9" ? "aspect-video" : "aspect-4/3"
                  }`}
                >
                  <Image
                    src={sl.src}
                    alt={sl.alt}
                    fill
                    /* SIZES FOLLOWS THE COLUMN COUNT. It was a fixed 24vw, which is right for the
                      * four-across strip and wrong for every other width this component takes: a
                      * three-across row is a 445px slot at 1440 and 24vw asks for 345, so Next served
                      * a file narrower than the box and the browser scaled it up. Measured, not
                      * guessed: 8 pages were serving soft images. */
                    sizes={`(min-width: 1024px) ${n === 5 ? 19 : n === 4 ? 24 : n === 3 ? 32 : 47}vw, (min-width: 640px) 46vw, 100vw`}
                    className="object-cover"
                  />
                </div>
                <figcaption
                  className={`flex-1 border-t px-5 py-4 ${
 dark ? "border-on-dark/12" : "border-border"
                  }`}
                >
                  {scene && (
                    <span className="mb-1.5 flex items-baseline gap-2.5">
                      {/* THE 01 / 02 / 03 MARKERS ARE GONE, and I added them two commits ago.
                        * rules.md D4 bans numbers describing a section, leading-zero steps by name.
                        * The scene titles and the line above the strip already say it is one frame
                        * at three settings, so the numbers were carrying nothing the words did not. */}
                      <span className={`font-display text-[1.02rem] font-bold leading-snug ${dark ? "text-on-dark" : "text-foreground"}`}>
                        {scene}
                      </span>
                    </span>
                  )}
                  <span className={`block text-sm leading-relaxed ${dark ? "text-on-dark-muted" : "text-muted-foreground"}`}>
                    {caption}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── A PORTRAIT PHOTOGRAPH AS A COLUMN ──
 * Not a section: this drops into a grid a page has already laid out, so a long table or list
 * gets a picture beside it rather than above it. */
export function PhotoAside({
  photo, label, caption, className = "",
}: {
  photo: string;
  label: string;
  caption: string;
  className?: string;
}) {
  const s = slot(photo);
  if (!s) return null;
  const portrait = s.ratio === "3/4" || s.ratio === "4/5";
  return (
    <figure
      className={`overflow-hidden rounded-lg bg-primary shadow-[var(--shadow-dark)] ring-1 ring-on-dark/10 ${className}`}
    >
      <Rail label={label} />
      <div className={`relative ${portrait ? "aspect-3/4" : "aspect-4/3"}`}>
        <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
      </div>
      <figcaption className="border-t border-on-dark/12 px-5 py-4 text-sm leading-relaxed text-on-dark-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
