/**
 * Point d'entrée de l'application.
 * Pour l'instant (étage 1), on affiche juste la coquille.
 * Les étages suivants viendront enrichir ce fichier.
 */

import { APP_NAME } from "./config.js";

/** Petite fonction utilitaire pour créer un élément DOM proprement. */
function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);
  Object.assign(node, props);
  children.forEach((child) => node.append(child));
  return node;
}

/** Construit la sidebar (version statique pour l'étage 1). */
function renderSidebar() {
  const sidebar = document.getElementById("sidebar");

  const brand = el("div", { className: "sidebar__brand" }, [
    el("span", { className: "sidebar__brand-dot" }),
    document.createTextNode(APP_NAME),
  ]);

  const nav = el("nav", { className: "sidebar__nav" }, [
    el("a", { className: "sidebar__link is-active", href: "#", textContent: "Tableau de bord" }),
    el("a", { className: "sidebar__link", href: "#", textContent: "Tâches" }),
    el("a", { className: "sidebar__link", href: "#", textContent: "Calendrier" }),
    el("a", { className: "sidebar__link", href: "#", textContent: "Budget" }),
    el("a", { className: "sidebar__link", href: "#", textContent: "Notes" }),
  ]);

  sidebar.append(brand, nav);
}

/** Construit la vue principale (placeholder pour l'étage 1). */
function renderView() {
  const view = document.getElementById("view");

  view.append(
    el("h1", { className: "view__title", textContent: "Tableau de bord" }),
    el("p", { className: "view__subtitle", textContent: "Les fondations sont posées. Prochain étage : la navigation." }),
    el("div", { className: "empty-state" }, [
      document.createTextNode("🚧 En construction — Étage 1 terminé."),
    ])
  );
}

/** Démarre l'application. */
function boot() {
  console.info(`[${APP_NAME}] Démarrage…`);
  renderSidebar();
  renderView();
}

// On attend que le DOM soit prêt avant de démarrer
document.addEventListener("DOMContentLoaded", boot);
