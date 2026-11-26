/**
 * real-life-patch-notes — entry for the make.fun bounty
 * "Real-Life Patch Notes: The Comedy Changelog"
 * (u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d).
 *
 * The program picks the strongest one-line patch note from a shortlist of
 * original candidates, scoring each against the judge's own brief, in the
 * order the brief weighs them:
 *   1. genuinely funny on a first read, resting on a real comedic idea;
 *   2. a specific, recognisable bug of the body or of daily life;
 *   3. reads like an actual release note (version, terse register, fix);
 *   4. uses its 160 characters well — every word working, no padding.
 * The winner is deterministic: the same shortlist always yields the same
 * line. The program validates the line against the gate (UTF-8 text, one
 * line, 1–160 characters, not only whitespace) and writes it byte for byte
 * to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), with no
 * trailing newline — the gate counts every character.
 *
 * Standard library only, no network, no input, no randomness.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 160;

interface Candidate {
  text: string;
  /** Funny on first read, on a real comedic idea (weight 3). */
  funny: number;
  /** Specific, recognisable bug — reader winces and laughs (weight 2). */
  specific: number;
  /** Release-note register: version, terse fix, shipped tone (weight 2). */
  register: number;
  /** Every word working, no padding (weight 1). */
  economy: number;
}

const CANDIDATES: Candidate[] = [
  {
    // The winner. The mouth's autopilot answers "you too" to a pleasantry,
    // and the fix quietly admits the blast radius: birthdays, weddings,
    // funerals — rising stakes, each one a wince everyone recognises.
    text: "v1.2.0: fixed a bug where the mouth auto-replied 'you too' to 'enjoy your meal'; fix also covers birthdays, weddings, and funerals.",
    funny: 5,
    specific: 5,
    register: 5,
    economy: 4,
  },
  {
    // The doorway effect: cross a threshold and the reason evaporates.
    // "Wiped the cache" maps the bug onto software exactly.
    text: "v2.0.4: fixed a bug where walking into a room wiped the cache of why you came in.",
    funny: 4,
    specific: 5,
    register: 5,
    economy: 5,
  },
  {
    // 3 a.m. cringe replay, in full HD with surround sound.
    text: "v7.0.3: fixed a bug where the brain replayed your most embarrassing moment at 3 a.m. in full HD with surround sound.",
    funny: 4,
    specific: 4,
    register: 4,
    economy: 4,
  },
  {
    // One sneeze queues three more, and there is no cancel button.
    text: "v5.1.0: fixed a bug where one sneeze queued three more sneezes with no cancel option.",
    funny: 4,
    specific: 4,
    register: 5,
    economy: 5,
  },
  {
    // The stomach waits for the quietest room in the building.
    text: "v8.2.1: fixed a bug where your stomach growled loudest in the quietest room available.",
    funny: 4,
    specific: 4,
    register: 4,
    economy: 4,
  },
  {
    // Knees after 30, with the breakfast-cereal sound effect.
    text: "v6.6.6: fixed a bug where your knees played a Rice Krispies sound effect every time you stood up after 30.",
    funny: 4,
    specific: 4,
    register: 4,
    economy: 3,
  },
];

function score(c: Candidate): number {
  return 3 * c.funny + 2 * c.specific + 2 * c.register + 1 * c.economy;
}

function pickEntry(): string {
  let best = CANDIDATES[0];
  for (const c of CANDIDATES.slice(1)) {
    if (score(c) > score(best)) best = c;
  }
  return best.text;
}

function entryText(): string {
  const text = pickEntry();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`entry is ${text.length} chars, must be 1-${MAX_CHARS}`);
  }
  if (text.trim() !== text || text.includes("\n") || text.trim() === "") {
    throw new Error("entry must be one clean, non-empty line");
  }
  // The gate counts every character; a control character would be judged
  // as part of the text, so refuse it rather than ship it silently.
  if (/[\u0000-\u001f\u007f]/.test(text)) {
    throw new Error("entry must not contain control characters");
  }
  return text;
}

function main(): void {
  const text = entryText();
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  // No trailing newline: the gate counts every character.
  writeFileSync(join(outDir, "entry.txt"), text, "utf-8");
  console.log(`entry (${text.length} chars): ${text}`);
}

main();
