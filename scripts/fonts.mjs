/* Copy the brand faces out of @fontsource into app/fonts so next/font/local can
 * fingerprint and preload them. Runs on install, so the woff2 binaries never need to be
 * committed to the repo or shipped in a deploy payload — they come from npm. */
import { mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";

const FILES = [
  ["@fontsource/archivo/files/archivo-latin-700-normal.woff2", "archivo-latin-700-normal.woff2"],
  ["@fontsource/archivo/files/archivo-latin-800-normal.woff2", "archivo-latin-800-normal.woff2"],
  ["@fontsource/barlow/files/barlow-latin-400-normal.woff2", "barlow-latin-400-normal.woff2"],
  ["@fontsource/barlow/files/barlow-latin-500-normal.woff2", "barlow-latin-500-normal.woff2"],
  ["@fontsource/barlow/files/barlow-latin-600-normal.woff2", "barlow-latin-600-normal.woff2"],
  ["@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2", "ibm-plex-mono-latin-500-normal.woff2"],
];

const out = join(process.cwd(), "app", "fonts");
mkdirSync(out, { recursive: true });
let copied = 0;
for (const [from, to] of FILES) {
  const src = join(process.cwd(), "node_modules", from);
  if (!existsSync(src)) {
    console.error(`fonts: missing ${from} — is @fontsource installed?`);
    process.exit(1);
  }
  copyFileSync(src, join(out, to));
  copied++;
}
console.log(`fonts: ${copied} faces copied into app/fonts`);
