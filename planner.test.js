import test from "node:test";
import assert from "node:assert/strict";
import { CONFERENCE } from "./schedule-data.js";
import {
  addPerson,
  buildIcs,
  choiceProgress,
  compareRows,
  daySummaryText,
  decodePlan,
  emptyPerson,
  encodePlan,
  escapeIcs,
  itinerary,
  normalizeState,
  removePerson,
  renamePerson,
  sessionForTrackSlot,
  setPick,
  talkKey,
  toggleStar,
  validateConference,
} from "./planner.js";

test("conference data covers every track in every choice slot", () => {
  assert.deepEqual(validateConference(CONFERENCE), []);
  const choiceSlots = CONFERENCE.slots.filter((slot) => slot.kind === "choice");
  assert.equal(choiceSlots.length, 4);
  assert.equal(CONFERENCE.tracks.length, 4);
  assert.equal(CONFERENCE.sessions.length, 16);
});

test("each choice slot has four distinct rooms", () => {
  for (const slot of CONFERENCE.slots.filter((item) => item.kind === "choice")) {
    const rooms = CONFERENCE.sessions.filter((session) => session.slotId === slot.id).map((session) => session.room);
    assert.equal(new Set(rooms).size, 4, slot.id);
  }
});

test("picking a track is exclusive per slot and toggling clears it", () => {
  let state = normalizeState(null);
  const person = state.people[0];
  const session = sessionForTrackSlot(CONFERENCE, "am1", "build");
  state = setPick(state, person.id, "am1", session.id);
  assert.equal(state.people[0].picks.am1, session.id);
  const other = sessionForTrackSlot(CONFERENCE, "am1", "secure");
  state = setPick(state, person.id, "am1", other.id);
  assert.equal(state.people[0].picks.am1, other.id);
  state = setPick(state, person.id, "am1", other.id);
  assert.equal(state.people[0].picks.am1, undefined);
});

test("itinerary marks unchosen parallel blocks as pending", () => {
  const person = emptyPerson("Joe");
  const rows = itinerary(CONFERENCE, person);
  assert.equal(rows.filter((row) => row.kind === "shared").length, 6);
  assert.equal(rows.filter((row) => row.pending).length, 4);
  const progress = choiceProgress(CONFERENCE, person);
  assert.deepEqual(progress, { filled: 0, total: 4 });
});

test("group compare shows who picked which track", () => {
  let state = normalizeState(null);
  const first = state.people[0];
  state = renamePerson(state, first.id, "Joe");
  state = addPerson(state, "Colleague");
  const joe = state.people[0];
  const colleague = state.people[1];
  state = setPick(state, joe.id, "am1", sessionForTrackSlot(CONFERENCE, "am1", "build").id);
  state = setPick(state, colleague.id, "am1", sessionForTrackSlot(CONFERENCE, "am1", "scale").id);
  const am1 = compareRows(CONFERENCE, state.people).find((row) => row.slot.id === "am1");
  assert.match(am1.cells[0].label, /^Build:/);
  assert.match(am1.cells[1].label, /^Scale:/);
});

test("shared plan links round-trip through encode and decode", () => {
  let state = normalizeState(null);
  const person = state.people[0];
  state = renamePerson(state, person.id, "Joe Smith");
  state = setPick(state, person.id, "pm2", sessionForTrackSlot(CONFERENCE, "pm2", "secure").id);
  state = toggleStar(state, person.id, talkKey("pm2-secure", 0));
  const restored = decodePlan(encodePlan(state));
  assert.equal(restored.people[0].name, "Joe Smith");
  assert.equal(restored.people[0].picks.pm2, "pm2-secure");
  assert.deepEqual(restored.people[0].stars, [talkKey("pm2-secure", 0)]);
});

test("calendar export includes chosen sessions and shared blocks", () => {
  let person = emptyPerson("Joe");
  person = { ...person, picks: { am1: "am1-create" } };
  const ics = buildIcs(CONFERENCE, person);
  assert.match(ics, /BEGIN:VCALENDAR/);
  assert.match(ics, /Create: Software-defined product/);
  assert.match(ics, /Opening plenary/);
  assert.match(ics, /Cognac Suite/);
  assert.doesNotMatch(ics, /Still to choose/);
  assert.equal(ics.includes("\r\n"), true);
});

test("ics escaping keeps commas and newlines valid", () => {
  assert.equal(escapeIcs("A, B; C\nD"), "A\\, B\\; C\\nD");
});

test("day summary lists rooms and pending blocks", () => {
  const person = { ...emptyPerson("Joe"), picks: { am1: "am1-build" } };
  const text = daySummaryText(CONFERENCE, person);
  assert.match(text, /Joe/);
  assert.match(text, /Build · Materials innovation/);
  assert.match(text, /Still to choose/);
});

test("the last remaining person cannot be removed", () => {
  const state = normalizeState(null);
  const next = removePerson(state, state.people[0].id);
  assert.equal(next.people.length, 1);
});

test("Sheffield and CHIMES talks are flagged in Build", () => {
  const morning = sessionForTrackSlot(CONFERENCE, "am1", "build");
  const late = sessionForTrackSlot(CONFERENCE, "pm2", "build");
  assert.ok(morning.talks.some((talk) => talk.highlight === "Sheffield" && /Heffernan/.test(talk.speakers)));
  assert.ok(late.talks.some((talk) => talk.highlight === "CHIMES"));
});
