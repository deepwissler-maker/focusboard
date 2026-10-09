/**
 * Service de gestion des tâches.
 * Responsabilité : logique métier + persistance via storage.js.
 * Ne touche JAMAIS au DOM.
 */

import { STORAGE_KEYS, TASK_PRIORITIES, TASK_STATUSES } from "../config.js";
import * as storage from "./storage.js";
import { generateId } from "../utils/ids.js";
import { validateTask } from "../utils/validators.js";

/**
 * Récupère toutes les tâches depuis le stockage.
 * @returns {Array<Object>}
 */
export function getAllTasks() {
  const tasks = storage.get(STORAGE_KEYS.TASKS, []);
  return Array.isArray(tasks) ? tasks : [];
}

/**
 * Récupère une tâche par son ID.
 * @param {string} id
 * @returns {Object|null}
 */
export function getTaskById(id) {
  return getAllTasks().find((task) => task.id === id) || null;
}

/**
 * Sauvegarde la liste complète des tâches.
 * @param {Array<Object>} tasks
 */
function saveAllTasks(tasks) {
  storage.set(STORAGE_KEYS.TASKS, tasks);
}

/**
 * Crée une nouvelle tâche.
 * @param {Object} data - { title, description?, priority?, status?, dueDate? }
 * @returns {{ success: boolean, task?: Object, errors?: string[] }}
 */
export function createTask(data) {
  const now = new Date().toISOString();

  const task = {
    id:          generateId(),
    title:       (data.title || "").trim(),
    description: (data.description || "").trim(),
    priority:    data.priority || TASK_PRIORITIES.MEDIUM.id,
    status:      data.status   || TASK_STATUSES.TODO.id,
    dueDate:     data.dueDate  || null,
    createdAt:   now,
    updatedAt:   now,
  };

  const { valid, errors } = validateTask(task);
  if (!valid) {
    return { success: false, errors };
  }

  const tasks = getAllTasks();
  tasks.push(task);
  saveAllTasks(tasks);

  return { success: true, task };
}

/**
 * Met à jour une tâche existante.
 * @param {string} id
 * @param {Object} changes - Champs à modifier
 * @returns {{ success: boolean, task?: Object, errors?: string[] }}
 */
export function updateTask(id, changes) {
  const tasks = getAllTasks();
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) {
    return { success: false, errors: ["Tâche introuvable."] };
  }

  const updated = {
    ...tasks[index],
    ...changes,
    id,                                       // on ne change JAMAIS l'id
    updatedAt: new Date().toISOString(),
  };

  const { valid, errors } = validateTask(updated);
  if (!valid) {
    return { success: false, errors };
  }

  tasks[index] = updated;
  saveAllTasks(tasks);

  return { success: true, task: updated };
}

/**
 * Supprime une tâche.
 * @param {string} id
 * @returns {boolean} - true si supprimée
 */
export function deleteTask(id) {
  const tasks = getAllTasks();
  const filtered = tasks.filter((task) => task.id !== id);

  if (filtered.length === tasks.length) {
    return false; // rien n'a été supprimé
  }

  saveAllTasks(filtered);
  return true;
}

/**
 * Bascule une tâche entre "à faire" et "terminée".
 * @param {string} id
 * @returns {Object|null} - la tâche mise à jour
 */
export function toggleTaskDone(id) {
  const task = getTaskById(id);
  if (!task) return null;

  const newStatus =
    task.status === TASK_STATUSES.DONE.id
      ? TASK_STATUSES.TODO.id
      : TASK_STATUSES.DONE.id;

  const result = updateTask(id, { status: newStatus });
  return result.success ? result.task : null;
}

/**
 * Retourne les tâches triées par date de création (récentes d'abord).
 */
export function getTasksSortedByCreation() {
  return getAllTasks().sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

/**
 * Retourne les statistiques sur les tâches.
 * @returns {{ total, todo, doing, done }}
 */
export function getTasksStats() {
  const tasks = getAllTasks();
  return {
    total: tasks.length,
    todo:  tasks.filter((t) => t.status === TASK_STATUSES.TODO.id).length,
    doing: tasks.filter((t) => t.status === TASK_STATUSES.DOING.id).length,
    done:  tasks.filter((t) => t.status === TASK_STATUSES.DONE.id).length,
  };
}
