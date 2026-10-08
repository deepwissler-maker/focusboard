import { el } from "../utils/dom.js";

/**
 * Page Tâches.
 * À l'étage 4, elle contiendra le CRUD complet.
 */
export function renderTasksPage(container) {
  container.append(
    el("h1", { className: "view__title", textContent: "Tâches" }),
    el("p", {
      className: "view__subtitle",
      textContent: "Gérez vos tâches et leur priorité.",
    }),
    el("div", { className: "empty-state" }, [
      "🚧 Le module de tâches arrive à l'étage 4.",
    ])
  );
}
