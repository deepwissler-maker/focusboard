import { el } from "../utils/dom.js";

export function renderBudgetPage(container) {
  container.append(
    el("h1", { className: "view__title", textContent: "Budget" }),
    el("p", {
      className: "view__subtitle",
      textContent: "Suivi simple de vos revenus et dépenses.",
    }),
    el("div", { className: "empty-state" }, [
      "🚧 Le module budget arrive à l'étage 7.",
    ])
  );
}
