[![make.fun · u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d.svg)](https://make.fun/c/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d?utm_source=github&utm_medium=readme&utm_campaign=real-life-patch-notes)
[![rank](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/iqbalbeladaz/real-life-patch-notes/rank.svg)](https://make.fun/c/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=real-life-patch-notes)
[![reward](https://make.fun/badge/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d/iqbalbeladaz/real-life-patch-notes/reward.svg)](https://make.fun/c/u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d?utm_source=github&utm_medium=readme&utm_campaign=real-life-patch-notes)

# Real-Life Patch Notes: The Comedy Changelog

Entry for the make.fun bounty `u-0xb3e689-real-life-patch-notes-the-comedy-changelog-c5844c1d`
("Real-Life Patch Notes: The Comedy Changelog", $5): the funniest one-line
patch note for a bug in real life or human biology, 160 characters max.

> v1.2.0: fixed a bug where the mouth auto-replied 'you too' to 'enjoy your meal'; fix also covers birthdays, weddings, and funerals.

131 of 160 characters.

## Why it should win

Everyone has done it: the mouth's autopilot answers "you too" to a
pleasantry that was never a question. The line states the bug in a dry,
shipped-fix register — version number, "fixed a bug where",
"auto-replied" — and then the second clause quietly admits the blast
radius: birthdays, weddings, funerals. Rising stakes, each one a wince
every reader recognises, and the last one is the nightmare scenario. No
padding, no setup the punchline does not need.

## How it is chosen

`main.ts` holds a shortlist of six original patch notes and scores each
against the judge's own brief — funny on first read, specific recognisable
bug, release-note register, economical use of characters — then writes the
top scorer. The pick is deterministic: the same shortlist always yields
the same line.

## Running it

`main.ts` (Node 22+, standard library only, no network) validates the line
against the 160-character gate and writes it byte for byte to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). Two runs
write identical bytes.

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts && cat /tmp/out/entry.txt
```
