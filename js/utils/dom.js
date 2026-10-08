/**
 * Helpers de manipulation DOM.
 * Toutes les fonctions ici sont pures et sans état.
 */

/**
 * Crée un élément DOM.
 * @param {string} tag - Nom de la balise (ex: "div", "button")
 * @param {Object} props - Propriétés à appliquer (className, textContent, etc.)
 * @param {Array<Node|string>} children - Enfants (éléments ou texte)
 * @returns {HTMLElement}
 */
export function el(tag, props = {}, children = []) {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    // Cas spécial : attributs data-* et aria-*
    if (key === "dataset") {
      Object.assign(node.dataset, value);
    } else if (key === "attrs") {
      for (const [attr, val] of Object.entries(value)) {
        node.setAttribute(attr, val);
      }
    } else if (key in node) {
      node[key] = value;
    } else {
      node.setAttribute(key, value);
    }
  }

  for (const child of children) {
    if (typeof child === "string") {
      node.append(document.createTextNode(child));
    } else if (child instanceof Node) {
      node.append(child);
    }
  }

  return node;
}

/** Vide entièrement un élément. */
export function clear(node) {
  while (node.firstChild) node.removeChild(node.firstChild);
}

/** Raccourci pour querySelector. */
export function $(selector, parent = document) {
  return parent.querySelector(selector);
}

/** Raccourci pour querySelectorAll (retourne un vrai tableau). */
export function $$(selector, parent = document) {
  return Array.from(parent.querySelectorAll(selector));
}
