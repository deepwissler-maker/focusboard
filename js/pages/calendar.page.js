import { el } from "../utils/dom.js";

export function renderCalendarPage(container) {
  container.append(
    el("h1", { className: "view__title", textContent: "Calendrier" }),
    el("p", {
      className: "view__subtitle",
      textContent: "Vue mensuelle de vos échéances.",
    }),
    el("div", { className: "empty-state" }, [
      "🚧 Le calendrier arrive à l'étage 9.",
    ])
  );
}
