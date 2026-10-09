/**
 * Génération d'identifiants uniques.
 * Utilise l'API native crypto.randomUUID() (disponible depuis 2022).
 */

/**
 * Génère un identifiant unique.
 * @returns {string} ex: "f3a2b1c4-1234-4abc-9def-0123456789ab"
 */
export function generateId() {
  // Fallback si crypto.randomUUID n'est pas disponible (très vieux navigateurs)
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback simple (suffisant pour un usage local)
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}
