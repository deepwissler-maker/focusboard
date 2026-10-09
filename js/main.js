/**
 * Point d'entrée de FocusBoard.
 */

import { APP_NAME, ROUTES, DEFAULT_ROUTE } from "./config.js";
import { createRouter } from "./core/router.js";
import { renderSidebar } from "./components/sidebar.js";
import { clear } from "./utils/dom.js";

import { renderDashboardPage } from "./pages/dashboard.page.js";
import { renderTasksPage } from "./pages/tasks.page.js";
import { renderCalendarPage } from "./pages/calendar.page.js";
import { renderBudgetPage } from "./pages/budget.page.js";
import { renderNotesPage } from "./pages/notes.page.js";

// --- Import temporaire pour les tests de l'étage 3 ---
import * as TasksService from "./services/tasks.service.js";

const viewEl = document.getElementById("view");
const sidebarEl = document.getElementById("sidebar");

function wrapPageRenderer(pageRenderer) {
  return () => {
    clear(viewEl);
    pageRenderer(viewEl);
    viewEl.scrollTop = 0;
  };
}

function refreshSidebar(activeRouteId, router) {
  renderSidebar(sidebarEl, activeRouteId, (routeId) => {
    router.navigate(routeId);
  });
}

function boot() {
  console.info(`[${APP_NAME}] Démarrage…`);

  const router = createRouter();

  router.register(ROUTES.DASHBOARD.id, wrapPageRenderer(renderDashboardPage));
  router.register(ROUTES.TASKS.id,     wrapPageRenderer(renderTasksPage));
  router.register(ROUTES.CALENDAR.id,  wrapPageRenderer(renderCalendarPage));
  router.register(ROUTES.BUDGET.id,    wrapPageRenderer(renderBudgetPage));
  router.register(ROUTES.NOTES.id,     wrapPageRenderer(renderNotesPage));

  router.setDefault(DEFAULT_ROUTE);
  router.onChange((routeId) => refreshSidebar(routeId, router));
  refreshSidebar(router.getCurrent() || DEFAULT_ROUTE, router);
  router.start();

  // --- TEST ÉTAGE 3 : décommente ce bloc pour vérifier ---
  // runStorageTests();
}

/* =========================================================
   TESTS MANUELS — ÉTAGE 3
   À exécuter UNE FOIS en console (décommenter l'appel dans boot).
   Supprime ensuite tous les tests créés pour ne pas polluer.
   ========================================================= */

function runStorageTests() {
  console.group("🧪 Tests Étage 3 — Service Tâches");

  // 1. Création
  const r1 = TasksService.createTask({
    title: "Acheter du pain",
    priority: "high",
    dueDate: "2026-10-10",
  });
  console.log("1. Création :", r1);
  console.assert(r1.success === true, "❌ La création aurait dû réussir");

  const r2 = TasksService.createTask({
    title: "Appeler le dentiste",
    description: "Prendre rendez-vous pour un contrôle",
  });
  console.log("2. Création 2 :", r2);
  console.assert(r2.success === true, "❌ La 2ᵉ création aurait dû réussir");

  // 2. Lecture
  const all = TasksService.getAllTasks();
  console.log("3. Liste complète :", all);
  console.assert(all.length === 2, "❌ Il devrait y avoir 2 tâches");

  // 3. Validation : titre vide
  const r3 = TasksService.createTask({ title: "  " });
  console.log("4. Création invalide (titre vide) :", r3);
  console.assert(r3.success === false, "❌ La création vide aurait dû échouer");

  // 4. Validation : date invalide
  const r4 = TasksService.createTask({ title: "Test", dueDate: "pas-une-date" });
  console.log("5. Création invalide (date) :", r4);
  console.assert(r4.success === false, "❌ La date invalide aurait dû échouer");

  // 5. Mise à jour
  const r5 = TasksService.updateTask(r1.task.id, { title: "Acheter du pain complet" });
  console.log("6. Mise à jour :", r5);
  console.assert(r5.success === true, "❌ La mise à jour aurait dû réussir");

  // 6. Toggle done
  const r6 = TasksService.toggleTaskDone(r1.task.id);
  console.log("7. Toggle terminé :", r6);
  console.assert(r6.status === "done", "❌ La tâche devrait être terminée");

  // 7. Stats
  const stats = TasksService.getTasksStats();
  console.log("8. Stats :", stats);
  console.assert(stats.total === 2, "❌ Il devrait y avoir 2 tâches au total");
  console.assert(stats.done === 1, "❌ Il devrait y avoir 1 tâche terminée");

  // 8. Suppression
  const deleted = TasksService.deleteTask(r2.task.id);
  console.log("9. Suppression :", deleted);
  console.assert(deleted === true, "❌ La suppression aurait dû réussir");
  console.assert(TasksService.getAllTasks().length === 1, "❌ Il devrait rester 1 tâche");

  console.groupEnd();
  console.info("✅ Tests terminés. Si tu vois des ❌ ci-dessus, il y a un bug.");
}
