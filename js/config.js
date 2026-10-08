/**
 * Configuration globale de FocusBoard.
 */

export const APP_NAME = "FocusBoard";

export const STORAGE_PREFIX = "focusboard:";

export const STORAGE_KEYS = {
  TASKS:  "tasks",
  BUDGET: "budget",
  NOTES:  "notes",
};

/**
 * Routes de l'application.
 * Chaque route a : un label (affiché dans la sidebar) et une icône SVG.
 * L'icône est un chemin SVG inline (viewBox 24x24, style Feather Icons).
 */
export const ROUTES = {
  DASHBOARD: {
    id: "dashboard",
    label: "Tableau de bord",
    icon: "M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10",
  },
  TASKS: {
    id: "tasks",
    label: "Tâches",
    icon: "M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11",
  },
  CALENDAR: {
    id: "calendar",
    label: "Calendrier",
    icon: "M3 9h18M8 3v4M16 3v4M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z",
  },
  BUDGET: {
    id: "budget",
    label: "Budget",
    icon: "M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6",
  },
  NOTES: {
    id: "notes",
    label: "Notes",
    icon: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  },
};

/** Route par défaut au démarrage. */
export const DEFAULT_ROUTE = ROUTES.DASHBOARD.id;
