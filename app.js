import { CONFERENCE } from "./schedule-data.js";
import {
  activePerson,
  addPerson,
  buildIcs,
  choiceProgress,
  compareRows,
  daySummaryText,
  decodePlan,
  encodePlan,
  formatRange,
  itinerary,
  loadState,
  normalizeState,
  removePerson,
  renamePerson,
  saveState,
  sessionForTrackSlot,
  sessionsForSlot,
  setPick,
  talkKey,
  toggleStar,
  trackById,
  validateConference,
} from "./planner.js";

const root = document.getElementById("app");
const errors = validateConference(CONFERENCE);
if (errors.length) {
  console.error("Schedule data errors", errors);
}

let state = loadState();
const imported = decodePlan(new URLSearchParams(location.search).get("plan") || location.hash.replace(/^#plan=/, ""));
if (imported) {
  state = {
    ...state,
    people: imported.people,
    activePersonId: imported.activePersonId,
  };
  history.replaceState({}, "", location.pathname);
  persist();
}

function persist() {
  saveState(state);
}

function setState(next) {
  state = next;
  persist();
  render();
}

function person() {
  return activePerson(state);
}

function render() {
  document.documentElement.dataset.theme = state.theme;
  document.body.dataset.view = state.view;
  root.innerHTML = `
    ${renderHeader()}
    <main>
      ${state.view === "grid" ? renderGrid() : ""}
      ${state.view === "day" ? renderDay() : ""}
      ${state.view === "compare" ? renderCompare() : ""}
      ${state.view === "info" ? renderInfo() : ""}
    </main>
    ${renderFooter()}
  `;
  bind();
}

function renderHeader() {
  const me = person();
  const progress = choiceProgress(CONFERENCE, me);
  return `
    <header class="site-header">
      <div class="mast">
        <p class="eyebrow">TechWorks · 30th anniversary summit</p>
        <h1>${CONFERENCE.shortName} <span>track planner</span></h1>
        <p class="lede">${CONFERENCE.tagline}</p>
        <p class="meta">${CONFERENCE.dateLabel} · ${CONFERENCE.venue.name}</p>
      </div>
      <div class="toolbar">
        <label class="person-switch">
          <span>Planning for</span>
          <select id="person-select" aria-label="Active person">
            ${state.people.map((item) => `
              <option value="${item.id}" ${item.id === me.id ? "selected" : ""}>${escapeHtml(item.name)}</option>
            `).join("")}
          </select>
        </label>
        <button type="button" class="ghost" data-action="rename">Rename</button>
        <button type="button" class="ghost" data-action="add-person">Add person</button>
        ${state.people.length > 1 ? `<button type="button" class="ghost danger" data-action="remove-person">Remove</button>` : ""}
        <p class="progress" aria-live="polite">${progress.filled} of ${progress.total} parallel blocks chosen</p>
      </div>
      <nav class="tabs" aria-label="Views">
        ${tabButton("grid", "All tracks")}
        ${tabButton("day", "My day")}
        ${tabButton("compare", "Compare people")}
        ${tabButton("info", "Venue")}
      </nav>
    </header>
  `;
}

function tabButton(view, label) {
  return `<button type="button" class="tab ${state.view === view ? "is-active" : ""}" data-view="${view}">${label}</button>`;
}

function renderGrid() {
  const me = person();
  return `
    <section class="panel">
      <div class="panel-head">
        <div>
          <h2>Choose one event in each parallel block</h2>
          <p>Shared moments — registration, plenary, breaks, lunch and the reception — are on every plan. For the four conference blocks, tap a track card to send ${escapeHtml(me.name)} there.</p>
        </div>
        <div class="track-legend">
          ${CONFERENCE.tracks.map((track) => `
            <span class="chip track-${track.id}">${track.name}<small>${track.host}</small></span>
          `).join("")}
        </div>
      </div>
      <div class="timeline">
        ${CONFERENCE.slots.map((slot) => slot.kind === "shared" ? renderSharedRow(slot) : renderChoiceRow(slot, me)).join("")}
      </div>
    </section>
  `;
}

function renderSharedRow(slot) {
  return `
    <article class="slot shared">
      <div class="when">
        <time>${formatRange(slot.start, slot.end)}</time>
        <strong>${escapeHtml(slot.title)}</strong>
      </div>
      <div class="shared-body">
        <p>${escapeHtml(slot.detail || "")}</p>
        ${slot.room ? `<p class="room">${escapeHtml(slot.room)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderChoiceRow(slot, me) {
  const selected = me.picks[slot.id];
  return `
    <article class="slot choice">
      <div class="when">
        <time>${formatRange(slot.start, slot.end)}</time>
        <strong>${escapeHtml(slot.title)}</strong>
        <span class="hint">${selected ? "1 track selected" : "Pick a track"}</span>
      </div>
      <div class="track-grid">
        ${CONFERENCE.tracks.map((track) => {
          const session = sessionForTrackSlot(CONFERENCE, slot.id, track.id);
          const isOn = selected === session.id;
          return `
            <button type="button" class="session-card track-${track.id} ${isOn ? "is-selected" : ""}" data-pick="${slot.id}:${session.id}">
              <span class="track-name">${track.name}</span>
              <strong>${escapeHtml(session.title)}</strong>
              <span class="host">${escapeHtml(session.host)}</span>
              <span class="room">${escapeHtml(session.room)}</span>
              <span class="summary">${escapeHtml(session.summary)}</span>
              <ul class="talks">
                ${session.talks.map((talk, index) => `
                  <li class="${talk.highlight ? "is-highlight" : ""} ${me.stars.includes(talkKey(session.id, index)) ? "is-starred" : ""}">
                    <em>${escapeHtml(talk.title)}</em>
                    <span>${escapeHtml(talk.speakers)}</span>
                    ${talk.highlight ? `<mark>${escapeHtml(talk.highlight)}</mark>` : ""}
                  </li>
                `).join("")}
              </ul>
              <span class="choose">${isOn ? "On your plan — tap to remove" : "Add to plan"}</span>
            </button>
          `;
        }).join("")}
      </div>
    </article>
  `;
}

function renderDay() {
  const me = person();
  const rows = itinerary(CONFERENCE, me);
  const pending = rows.filter((row) => row.pending).length;
  return `
    <section class="panel day">
      <div class="panel-head">
        <div>
          <h2>${escapeHtml(me.name)}’s Wednesday</h2>
          <p>${pending ? `${pending} parallel block${pending === 1 ? "" : "s"} still need a track.` : "Every parallel block has a track. Export or print this as a pocket programme."}</p>
        </div>
        <div class="actions">
          <button type="button" class="solid" data-action="ics">Add to calendar</button>
          <button type="button" class="ghost" data-action="copy-day">Copy text</button>
          <button type="button" class="ghost" data-action="print">Print</button>
          <button type="button" class="ghost" data-action="share">Share link</button>
        </div>
      </div>
      <ol class="day-list">
        ${rows.map((row) => renderDayRow(row, me)).join("")}
      </ol>
    </section>
  `;
}

function renderDayRow(row, me) {
  if (row.pending) {
    return `
      <li class="day-item pending">
        <time>${formatRange(row.slot.start, row.slot.end)}</time>
        <div>
          <strong>Choose a track</strong>
          <p>Four sessions run at once. Jump back to All tracks to pick one for this block.</p>
          <button type="button" class="text-link" data-view="grid">Open track grid</button>
        </div>
      </li>
    `;
  }
  if (!row.session) {
    return `
      <li class="day-item shared">
        <time>${formatRange(row.slot.start, row.slot.end)}</time>
        <div>
          <strong>${escapeHtml(row.slot.title)}</strong>
          <p>${escapeHtml(row.slot.detail || "")}</p>
          ${row.slot.room ? `<p class="room">${escapeHtml(row.slot.room)}</p>` : ""}
        </div>
      </li>
    `;
  }
  const track = trackById(CONFERENCE, row.session.trackId);
  return `
    <li class="day-item track-${track.id}">
      <time>${formatRange(row.slot.start, row.slot.end)}</time>
      <div>
        <p class="track-name">${track.name} · ${track.title}</p>
        <strong>${escapeHtml(row.session.title)}</strong>
        <p>${escapeHtml(row.session.summary)}</p>
        <p class="room">${escapeHtml(row.session.room)}</p>
        <ul class="talks">
          ${row.session.talks.map((talk, index) => {
            const key = talkKey(row.session.id, index);
            const starred = me.stars.includes(key);
            return `
              <li>
                <button type="button" class="star ${starred ? "is-on" : ""}" data-star="${key}" aria-pressed="${starred}" aria-label="${starred ? "Unstar" : "Star"} ${escapeHtml(talk.title)}">★</button>
                <div>
                  <em>${escapeHtml(talk.title)}</em>
                  <span>${escapeHtml(talk.speakers)}</span>
                </div>
              </li>
            `;
          }).join("")}
        </ul>
      </div>
    </li>
  `;
}

function renderCompare() {
  const rows = compareRows(CONFERENCE, state.people);
  return `
    <section class="panel compare">
      <div class="panel-head">
        <div>
          <h2>Who is going where</h2>
          <p>Add colleagues, then pick their tracks. The table shows clashes and coverage across Build, Create, Secure and Scale.</p>
        </div>
        <div class="actions">
          <button type="button" class="ghost" data-action="add-person">Add person</button>
          <button type="button" class="ghost" data-action="share">Share everyone’s plans</button>
        </div>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              ${state.people.map((item) => `<th>${escapeHtml(item.name)}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => `
              <tr class="${row.shared ? "shared" : ""}">
                <th>
                  <time>${formatRange(row.slot.start, row.slot.end)}</time>
                  <span>${escapeHtml(row.slot.title)}</span>
                </th>
                ${row.cells.map((cell) => `
                  <td class="${cell.trackId ? `track-${cell.trackId}` : "empty"}">${escapeHtml(cell.label)}</td>
                `).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderInfo() {
  return `
    <section class="panel info">
      <div class="venue-grid">
        <article>
          <h2>Venue</h2>
          <p><strong>${CONFERENCE.venue.name}</strong><br>${CONFERENCE.venue.address}</p>
          <p><a href="${CONFERENCE.venue.mapsUrl}" target="_blank" rel="noreferrer">Open in maps</a></p>
          <ul>
            ${CONFERENCE.venue.travel.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </article>
        <article>
          <h2>Rooms</h2>
          <dl class="rooms">
            <div><dt>Registration, exhibition, breaks, lunch</dt><dd>Champagne Suite</dd></div>
            <div><dt>Plenary + Build</dt><dd>Avize room, Champagne Suite</dd></div>
            <div><dt>Scale</dt><dd>Morangis room, Champagne Suite</dd></div>
            <div><dt>Secure</dt><dd>Bourgogne Suite</dd></div>
            <div><dt>Create</dt><dd>Cognac Suite</dd></div>
            <div><dt>Evening reception</dt><dd>Exhibition area at 18:00</dd></div>
          </dl>
        </article>
        <article>
          <h2>Tracks</h2>
          <ul class="track-details">
            ${CONFERENCE.tracks.map((track) => `
              <li class="track-${track.id}">
                <strong>${track.name}</strong>
                <span>${track.title}</span>
                <span>Hosted by ${track.host}${track.sponsor ? ` · sponsored by ${track.sponsor}` : ""}</span>
                <span>${track.room}</span>
              </li>
            `).join("")}
          </ul>
        </article>
        <article>
          <h2>Official sources</h2>
          <p>Session titles and speakers are taken from the published S2S26 agenda. Individual talk start times inside a block are not listed by TechWorks, so this planner treats each 90-minute block as the choice point.</p>
          <p><a href="${CONFERENCE.website}" target="_blank" rel="noreferrer">Summit site</a> · <a href="${CONFERENCE.agendaUrl}" target="_blank" rel="noreferrer">Full agenda</a></p>
        </article>
      </div>
    </section>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <p>Unofficial companion planner for ${CONFERENCE.name}. Plans stay in this browser unless you share a link.</p>
      <button type="button" class="ghost" data-action="theme">${state.theme === "dark" ? "Light theme" : "Dark theme"}</button>
    </footer>
  `;
}

function bind() {
  root.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => setState({ ...state, view: button.dataset.view }));
  });

  const select = root.querySelector("#person-select");
  if (select) {
    select.addEventListener("change", () => setState({ ...state, activePersonId: select.value }));
  }

  root.querySelectorAll("[data-pick]").forEach((button) => {
    button.addEventListener("click", () => {
      const [slotId, sessionId] = button.dataset.pick.split(":");
      setState(setPick(state, person().id, slotId, sessionId));
    });
  });

  root.querySelectorAll("[data-star]").forEach((button) => {
    button.addEventListener("click", () => {
      setState(toggleStar(state, person().id, button.dataset.star));
    });
  });

  root.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => handleAction(button.dataset.action));
  });
}

function handleAction(action) {
  if (action === "theme") {
    setState({ ...state, theme: state.theme === "dark" ? "light" : "dark" });
    return;
  }
  if (action === "add-person") {
    const name = window.prompt("Name for this plan", `Person ${state.people.length + 1}`);
    if (!name) return;
    setState(addPerson(state, name));
    return;
  }
  if (action === "rename") {
    const name = window.prompt("Rename this plan", person().name);
    if (!name) return;
    setState(renamePerson(state, person().id, name));
    return;
  }
  if (action === "remove-person") {
    if (!window.confirm(`Remove ${person().name}’s plan from this browser?`)) return;
    setState(removePerson(state, person().id));
    return;
  }
  if (action === "print") {
    window.print();
    return;
  }
  if (action === "ics") {
    const blob = new Blob([buildIcs(CONFERENCE, person())], { type: "text/calendar" });
    download(blob, `${CONFERENCE.shortName}-${slug(person().name)}.ics`);
    return;
  }
  if (action === "copy-day") {
    copyText(daySummaryText(CONFERENCE, person()));
    return;
  }
  if (action === "share") {
    const url = `${location.origin}${location.pathname}?plan=${encodePlan(state)}`;
    copyText(url);
  }
}

function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast("Copied to clipboard");
  } catch {
    window.prompt("Copy this", text);
  }
}

function toast(message) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = message;
  document.body.append(el);
  setTimeout(() => el.remove(), 2200);
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "plan";
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

window.__plannerTest = {
  CONFERENCE,
  state: () => state,
  normalizeState,
  setState,
};

render();
