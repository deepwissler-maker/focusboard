/**
 * Configuration globale de FocusBoard.
 * Toute valeur "magique" du projet doit vivre ici,
 * jamais en dur dans un autre fichier.
 */

export const APP_NAME = "FocusBoard";

/** Préfixe utilisé pour toutes les clés localStorage (évite les collisions). */
export const STORAGE_PREFIX = "focusboard:";

/** Clés de stockage par module. */
export const STORAGE_KEYS = {
  TASKS:  "tasks",
  BUDGET: "budget",
  NOTES:  "notes",
};

/** Routes disponibles (utilisées par le router à l'étage 2). */
export const ROUTES = {
  DASHBOARD: "dashboard",
  TASKS:     "tasks",
  CALENDAR:  "calendar",
  BUDGET:    "budget",
  NOTES:     "notes",
};
