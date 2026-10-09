/**
 * Abstraction du stockage.
 * RÈGLE : aucun autre fichier du projet ne touche directement à localStorage.
 * On passe TOUJOURS par ce module.
 */

import { STORAGE_PREFIX } from "../config.js";

/** Construit la clé complète avec le préfixe de l'app. */
function buildKey(key) {
  return `${STORAGE_PREFIX}${key}`;
}

/**
 * Lit une valeur depuis localStorage et la désérialise.
 * @param {string} key - Clé logique (ex: "tasks")
 * @param {*} fallback - Valeur retournée si la clé n'existe pas
 * @returns {*}
 */
export function get(key, fallback = null) {
  try {
    const raw = localStorage.getItem(buildKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (error) {
    console.error(`[Storage] Erreur de lecture pour "${key}" :`, error);
    return fallback;
  }
}

/**
 * Sérialise et écrit une valeur dans localStorage.
 * @param {string} key - Clé logique
 * @param {*} value - Valeur à enregistrer (sera JSON.stringify)
 * @returns {boolean} - true si l'écriture a réussi
 */
export function set(key, value) {
  try {
    localStorage.setItem(buildKey(key), JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[Storage] Erreur d'écriture pour "${key}" :`, error);
    return false;
  }
}

/**
 * Supprime une clé.
 */
export function remove(key) {
  try {
    localStorage.removeItem(buildKey(key));
    return true;
  } catch (error) {
    console.error(`[Storage] Erreur de suppression pour "${key}" :`, error);
    return false;
  }
}

/**
 * Vérifie si une clé existe.
 */
export function has(key) {
  return localStorage.getItem(buildKey(key)) !== null;
}

/**
 * Vide tout le stockage de l'application (utile pour un "reset").
 * Ne touche PAS aux autres clés localStorage d'autres sites.
 */
export function clearAll() {
  const prefix = STORAGE_PREFIX;
  const keysToRemove = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(prefix)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => localStorage.removeItem(key));
}
