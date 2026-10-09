/**
 * Validateurs réutilisables.
 * Chaque fonction retourne { valid: boolean, error?: string }.
 */

/**
 * Vérifie qu'une valeur est une chaîne non vide (après trim).
 */
export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Vérifie qu'une date est valide et au format YYYY-MM-DD.
 */
export function isValidDateString(value) {
  if (typeof value !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

/**
 * Vérifie qu'un nombre est un entier positif ou zéro.
 */
export function isPositiveNumber(value) {
  return typeof value === "number" && !Number.isNaN(value) && value >= 0;
}

/**
 * Valide une tâche avant sauvegarde.
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateTask(task) {
  const errors = [];

  if (!isNonEmptyString(task.title)) {
    errors.push("Le titre est obligatoire.");
  }
  if (task.title && task.title.length > 200) {
    errors.push("Le titre ne doit pas dépasser 200 caractères.");
  }
  if (task.dueDate && !isValidDateString(task.dueDate)) {
    errors.push("La date d'échéance est invalide (format attendu : YYYY-MM-DD).");
  }
  if (task.priority && !["low", "medium", "high"].includes(task.priority)) {
    errors.push("La priorité doit être 'low', 'medium' ou 'high'.");
  }
  if (task.status && !["todo", "doing", "done"].includes(task.status)) {
    errors.push("Le statut doit être 'todo', 'doing' ou 'done'.");
  }

  return { valid: errors.length === 0, errors };
}
