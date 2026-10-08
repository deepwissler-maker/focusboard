/**
 * Point d'entrée de FocusBoard.
 * Rôle : assembler le router, la sidebar et les pages.
 * Aucune logique métier ici — uniquement du câblage.
 */

import { APP_NAME, ROUTES, DEFAULT_ROUTE } from "./config.js";
import { createRouter } from "./core/router.js";
import { renderSidebar } from "./components/sidebar.js";
import { clear } from "./utils/dom.js";

// Import des pages
import { renderDashboardPage } from "./pages/dashboard.page.js";
import { renderTasksPage } from "./pages/tasks.page.js";
import { renderCalendarPage } from "./pages/calendar.page.js";
import { renderBudgetPage } from "./pages/budget.page.js";
import { renderNotesPage } from "./pages/notes.page.js";

/** Conteneur de la vue principale. */
const viewEl = document.getElementById("view");

/** Conteneur de la sidebar. */
const sidebarEl = document.getElementById("sidebar");

/**
 * Enveloppe une fonction de rendu de page pour :
 * - vider le conteneur avant chaque rendu
 * - remonter en haut de page
 */
function wrapPageRenderer(pageRenderer) {
  return () => {
    clear(viewEl);
    pageRenderer(viewEl);
    viewEl.scrollTop = 0;
  };
}

/** Redessine la sidebar selon la route active. */
function refreshSidebar(activeRouteId, router) {
  renderSidebar(sidebarEl, activeRouteId, (routeId) => {
    router.navigate(routeId);
  });
}

/** Démarre l'application. */
function boot() {
  console.info(`[${APP_NAME}] Démarrage…`);

  const router = createRouter();

  // Enregistrement des routes
  router.register(ROUTES.DASHBOARD.id, wrapPageRenderer(renderDashboardPage));
  router.register(ROUTES.TASKS.id,     wrapPageRenderer(renderTasksPage));
  router.register(ROUTES.CALENDAR.id,  wrapPageRenderer(renderCalendarPage));
  router.register(ROUTES.BUDGET.id,    wrapPageRenderer(renderBudgetPage));
  router.register(ROUTES.NOTES.id,     wrapPageRenderer(renderNotesPage));

  router.setDefault(DEFAULT_ROUTE);

  // À chaque changement de route, on rafraîchit la sidebar
  router.onChange((routeId) => refreshSidebar(routeId, router));

  // Premier rendu de la sidebar avant le start (évite un flash vide)
  refreshSidebar(router.getCurrent() || DEFAULT_ROUTE, router);

  // Démarre l'écoute du hash
  router.start();
}

document.addEventListener("DOMContentLoaded", boot);
