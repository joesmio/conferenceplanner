const STORAGE_KEY = "s2s26-planner-v1";
const PLAN_VERSION = 1;

export function newId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `p-${Math.random().toString(36).slice(2, 10)}`;
}

export function emptyPerson(name = "You") {
  return { id: newId(), name, picks: {}, stars: [] };
}

export function defaultState() {
  return {
    people: [emptyPerson("You")],
    activePersonId: null,
    view: "grid",
    theme: "light",
  };
}

export function normalizeState(raw) {
  const fallback = defaultState();
  if (!raw || typeof raw !== "object") {
    fallback.activePersonId = fallback.people[0].id;
    return fallback;
  }
  const people = Array.isArray(raw.people) && raw.people.length
    ? raw.people.map((person, index) => ({
        id: typeof person.id === "string" && person.id ? person.id : newId(),
        name: typeof person.name === "string" && person.name.trim() ? person.name.trim() : `Person ${index + 1}`,
        picks: person.picks && typeof person.picks === "object" ? { ...person.picks } : {},
        stars: Array.isArray(person.stars) ? person.stars.filter((item) => typeof item === "string") : [],
      }))
    : fallback.people;
  const activePersonId = people.some((person) => person.id === raw.activePersonId)
    ? raw.activePersonId
    : people[0].id;
  const view = ["grid", "day", "compare", "info"].includes(raw.view) ? raw.view : "grid";
  const theme = raw.theme === "dark" ? "dark" : "light";
  return { people, activePersonId, view, theme };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return normalizeState(raw ? JSON.parse(raw) : null);
  } catch {
    return normalizeState(null);
  }
}

export function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    people: state.people,
    activePersonId: state.activePersonId,
    view: state.view,
    theme: state.theme,
  }));
}

export function trackById(conference, trackId) {
  return conference.tracks.find((track) => track.id === trackId) || null;
}

export function slotById(conference, slotId) {
  return conference.slots.find((slot) => slot.id === slotId) || null;
}

export function sessionById(conference, sessionId) {
  return conference.sessions.find((session) => session.id === sessionId) || null;
}

export function sessionsForSlot(conference, slotId) {
  return conference.sessions.filter((session) => session.slotId === slotId);
}

export function sessionForTrackSlot(conference, slotId, trackId) {
  return conference.sessions.find((session) => session.slotId === slotId && session.trackId === trackId) || null;
}

export function validateConference(conference) {
  const errors = [];
  const slotIds = new Set();
  const sessionIds = new Set();
  const trackIds = new Set(conference.tracks.map((track) => track.id));

  for (const slot of conference.slots) {
    if (slotIds.has(slot.id)) errors.push(`Duplicate slot ${slot.id}`);
    slotIds.add(slot.id);
    if (!/^\d{2}:\d{2}$/.test(slot.start) || !/^\d{2}:\d{2}$/.test(slot.end)) {
      errors.push(`Bad time on slot ${slot.id}`);
    }
    if (toMinutes(slot.end) <= toMinutes(slot.start)) {
      errors.push(`Slot ${slot.id} ends before it starts`);
    }
  }

  for (const session of conference.sessions) {
    if (sessionIds.has(session.id)) errors.push(`Duplicate session ${session.id}`);
    sessionIds.add(session.id);
    if (!slotIds.has(session.slotId)) errors.push(`Session ${session.id} has unknown slot`);
    if (!trackIds.has(session.trackId)) errors.push(`Session ${session.id} has unknown track`);
    const slot = conference.slots.find((item) => item.id === session.slotId);
    if (slot && slot.kind !== "choice") errors.push(`Session ${session.id} attached to non-choice slot`);
  }

  for (const slot of conference.slots.filter((item) => item.kind === "choice")) {
    for (const trackId of trackIds) {
      if (!conference.sessions.some((session) => session.slotId === slot.id && session.trackId === trackId)) {
        errors.push(`Missing ${trackId} session for ${slot.id}`);
      }
    }
  }

  return errors;
}

export function toMinutes(hhmm) {
  const [hours, minutes] = hhmm.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatRange(start, end) {
  return `${start}–${end}`;
}

export function activePerson(state) {
  return state.people.find((person) => person.id === state.activePersonId) || state.people[0];
}

export function setPick(state, personId, slotId, sessionId) {
  return {
    ...state,
    people: state.people.map((person) => {
      if (person.id !== personId) return person;
      const next = { ...person.picks };
      if (next[slotId] === sessionId) {
        delete next[slotId];
      } else {
        next[slotId] = sessionId;
      }
      return { ...person, picks: next };
    }),
  };
}

export function toggleStar(state, personId, talkKey) {
  return {
    ...state,
    people: state.people.map((person) => {
      if (person.id !== personId) return person;
      const has = person.stars.includes(talkKey);
      return {
        ...person,
        stars: has ? person.stars.filter((item) => item !== talkKey) : [...person.stars, talkKey],
      };
    }),
  };
}

export function talkKey(sessionId, talkIndex) {
  return `${sessionId}#${talkIndex}`;
}

export function renamePerson(state, personId, name) {
  const trimmed = name.trim() || "Untitled";
  return {
    ...state,
    people: state.people.map((person) => (person.id === personId ? { ...person, name: trimmed } : person)),
  };
}

export function addPerson(state, name) {
  const person = emptyPerson(name);
  return { ...state, people: [...state.people, person], activePersonId: person.id };
}

export function removePerson(state, personId) {
  if (state.people.length === 1) return state;
  const people = state.people.filter((person) => person.id !== personId);
  return {
    ...state,
    people,
    activePersonId: state.activePersonId === personId ? people[0].id : state.activePersonId,
  };
}

export function itinerary(conference, person) {
  return conference.slots.map((slot) => {
    if (slot.kind === "shared") {
      return { slot, kind: "shared", session: null, pending: false };
    }
    const sessionId = person.picks[slot.id];
    const session = sessionId ? sessionById(conference, sessionId) : null;
    return { slot, kind: "choice", session, pending: !session };
  });
}

export function choiceProgress(conference, person) {
  const choiceSlots = conference.slots.filter((slot) => slot.kind === "choice");
  const filled = choiceSlots.filter((slot) => Boolean(person.picks[slot.id])).length;
  return { filled, total: choiceSlots.length };
}

export function compareRows(conference, people) {
  return conference.slots.map((slot) => {
    if (slot.kind === "shared") {
      return { slot, shared: true, cells: people.map(() => ({ label: slot.title, trackId: "shared" })) };
    }
    return {
      slot,
      shared: false,
      cells: people.map((person) => {
        const session = sessionById(conference, person.picks[slot.id]);
        if (!session) return { label: "Not chosen", trackId: null };
        const track = trackById(conference, session.trackId);
        return { label: `${track.name}: ${session.title}`, trackId: track.id, session };
      }),
    };
  });
}

export function encodePlan(state) {
  const payload = {
    v: PLAN_VERSION,
    people: state.people.map((person) => ({
      n: person.name,
      p: person.picks,
      s: person.stars,
    })),
  };
  const json = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodePlan(token) {
  if (!token || typeof token !== "string") return null;
  try {
    const padded = token.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const payload = JSON.parse(new TextDecoder().decode(bytes));
    if (!payload || !Array.isArray(payload.people)) return null;
    const people = payload.people.map((item, index) => ({
      id: newId(),
      name: typeof item.n === "string" && item.n.trim() ? item.n.trim() : `Person ${index + 1}`,
      picks: item.p && typeof item.p === "object" ? item.p : {},
      stars: Array.isArray(item.s) ? item.s.filter((value) => typeof value === "string") : [],
    }));
    if (!people.length) return null;
    return { people, activePersonId: people[0].id };
  } catch {
    return null;
  }
}

function icsStamp(date, hhmm) {
  const compact = `${date.replace(/-/g, "")}T${hhmm.replace(":", "")}00`;
  return compact;
}

export function escapeIcs(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function buildIcs(conference, person) {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//S2S26 Planner//EN",
    "CALSCALE:GREGORIAN",
    `X-WR-CALNAME:${escapeIcs(`${person.name} · ${conference.shortName}`)}`,
  ];

  for (const row of itinerary(conference, person)) {
    if (row.pending) continue;
    const title = row.session
      ? `${trackById(conference, row.session.trackId).name}: ${row.session.title}`
      : row.slot.title;
    const location = row.session?.room || row.slot.room || conference.venue.name;
    const description = row.session
      ? `${row.session.summary}\n\n${(row.session.talks || []).map((talk) => `• ${talk.title} — ${talk.speakers}`).join("\n")}`
      : row.slot.detail || "";
    const uid = `${conference.id}-${person.id}-${row.slot.id}@conferenceplanner`;
    lines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${icsStamp(conference.date, "08:00")}Z`,
      `DTSTART;TZID=${conference.timezone}:${icsStamp(conference.date, row.slot.start)}`,
      `DTEND;TZID=${conference.timezone}:${icsStamp(conference.date, row.slot.end)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `LOCATION:${escapeIcs(location)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      "END:VEVENT",
    );
  }

  lines.push("END:VCALENDAR");
  return `${lines.join("\r\n")}\r\n`;
}

export function daySummaryText(conference, person) {
  const lines = [
    `${conference.shortName} plan for ${person.name}`,
    `${conference.dateLabel} · ${conference.venue.name}`,
    "",
  ];
  for (const row of itinerary(conference, person)) {
    const when = formatRange(row.slot.start, row.slot.end);
    if (row.pending) {
      lines.push(`${when}  Still to choose`);
      continue;
    }
    if (row.session) {
      const track = trackById(conference, row.session.trackId);
      lines.push(`${when}  ${track.name} · ${row.session.title}`);
      lines.push(`         ${row.session.room}`);
    } else {
      lines.push(`${when}  ${row.slot.title}`);
      if (row.slot.room) lines.push(`         ${row.slot.room}`);
    }
  }
  return lines.join("\n");
}
