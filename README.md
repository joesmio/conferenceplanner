# S2S26 track planner

Static companion for the [TechWorks Semiconductors to Systems Summit](https://techworks.org.uk/tws2s26/) on **26 August 2026** at Novotel London West.

Four conferences run in parallel. This site lets anyone — or a named group of colleagues — pick **one event per time block**, then keep a personal Wednesday plan.

**Live site:** [https://joesmio.github.io/conferenceplanner/](https://joesmio.github.io/conferenceplanner/)

GitHub Pages is publishing from this repo as a project site under `joesmio.github.io`.

## What you can do

- Browse Build, Create, Secure and Scale side by side
- Tap a track card to put that block on a named person’s plan
- Add colleagues and compare who is in which room
- Star talks you do not want to miss
- Export an `.ics` calendar, copy a text programme, print, or share a link

Plans are stored in the browser. A share link encodes the same picks so someone else can open them.

Agenda, rooms and speakers come from the official [S2S26 agenda](https://techworks.org.uk/s2s26-agenda/) and joining instructions. Talks inside a 90-minute block do not have published start times, so the planner treats each parallel block as the choice point.

## Local

```bash
npm test
npm start
```

Then open `http://localhost:4173/`.

GitHub Pages deploys from `main` via `.github/workflows/pages.yml`.
