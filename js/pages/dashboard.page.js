import { el } from "../utils/dom.js";

/**
 * Page Tableau de bord.
 * À l'étage 6, elle agrégera tâches, budget et notes.
 */
export function renderDashboardPage(container) {
  container.append(
    el("h1", { className: "view__title", textContent: "Tableau de bord" }),
    el("p", {
      className: "view__subtitle",
      textContent: "Vue d'ensemble de votre activité.",
    }),
    el("div", { className: "empty-state" }, [
      "🚧 Le tableau de bord sera rempli à l'étage 6.",
    ])
  );
}
