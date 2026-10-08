/**
 * Routeur minimal basé sur le hash de l'URL (#/route).
 * Principe : on enregistre des routes, on écoute les changements de hash,
 * et on appelle le renderer correspondant.
 */

export function createRouter() {
  /** Table des routes : { nomRoute: rendererFunction } */
  const routes = new Map();

  /** Route par défaut si le hash est vide ou inconnu. */
  let defaultRoute = null;

  /** Callback appelé après chaque changement de route. */
  let onRouteChange = null;

  /** Extrait la route courante depuis l'URL (ex: "#/tasks" → "tasks"). */
  function getCurrentRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "");
    return hash || defaultRoute;
  }

  /** Déclenche le rendu de la route active. */
  function render() {
    const route = getCurrentRoute();
    const renderer = routes.get(route);

    if (!renderer) {
      // Route inconnue → on redirige vers la route par défaut
      if (defaultRoute && route !== defaultRoute) {
        navigate(defaultRoute);
        return;
      }
      console.warn(`[Router] Route inconnue : "${route}"`);
      return;
    }

    renderer();
    if (onRouteChange) onRouteChange(route);
  }

  return {
    /** Enregistre une route et sa fonction de rendu. */
    register(name, renderer) {
      routes.set(name, renderer);
    },

    /** Définit la route par défaut. */
    setDefault(name) {
      defaultRoute = name;
    },

    /** Définit un callback à appeler à chaque changement de route. */
    onChange(callback) {
      onRouteChange = callback;
    },

    /** Navigue programmatiquement vers une route. */
    navigate(name) {
      window.location.hash = `#/${name}`;
    },

    /** Démarre l'écoute des changements de hash. */
    start() {
      window.addEventListener("hashchange", render);
      render();
    },

    /** Retourne la route actuellement active. */
    getCurrent() {
      return getCurrentRoute();
    },
  };
}
