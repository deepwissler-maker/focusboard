/**
 * Sidebar : navigation principale de l'application.
 * Se génère automatiquement depuis la config ROUTES.
 */

import { APP_NAME, ROUTES } from "../config.js";
import { el, clear } from "../utils/dom.js";

/**
 * Crée un lien de navigation.
 * @param {Object} route - Entrée de ROUTES
 * @param {boolean} isActive - Si c'est la route courante
 * @param {Function} onNavigate - Callback au clic
 */
function createNavLink(route, isActive, onNavigate) {
  // Icône SVG inline (pas de dépendance externe)
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("width", "18");
  svg.setAttribute("height", "18");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", route.icon);
  svg.append(path);

  const link = el(
    "a",
    {
      className: `sidebar__link${isActive ? " is-active" : ""}`,
      href: `#/${route.id}`,
      dataset: { route: route.id },
      attrs: { "aria-current": isActive ? "page" : "false" },
    },
    [svg, el("span", { textContent: route.label })]
  );

  // On empêche le comportement par défaut pour laisser le router gérer
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (onNavigate) onNavigate(route.id);
  });

  return link;
}

/**
 * Rend la sidebar complète dans son conteneur.
 * @param {HTMLElement} container - L'élément #sidebar
 * @param {string} activeRouteId - Route courante
 * @param {Function} onNavigate - Callback quand on clique un lien
 */
export function renderSidebar(container, activeRouteId, onNavigate) {
  clear(container);

  // Marque
  const brand = el("div", { className: "sidebar__brand" }, [
    el("span", { className: "sidebar__brand-dot" }),
    el("span", { textContent: APP_NAME }),
  ]);

  // Navigation
  const nav = el(
    "nav",
    { className: "sidebar__nav", attrs: { "aria-label": "Navigation principale" } },
    Object.values(ROUTES).map((route) =>
      createNavLink(route, route.id === activeRouteId, onNavigate)
    )
  );

  container.append(brand, nav);
}
