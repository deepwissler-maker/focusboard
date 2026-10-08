import { el } from "../utils/dom.js";

export function renderNotesPage(container) {
  container.append(
    el("h1", { className: "view__title", textContent: "Notes" }),
    el("p", {
      className: "view__subtitle",
      textContent: "Notes rapides et persistantes.",
    }),
    el("div", { className: "empty-state" }, [
      "🚧 Le module notes arrive à l'étage 8.",
    ])
  );
}
