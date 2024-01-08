import { Route } from './routes';
import { findRoute, renderRoute } from './routeHelper';

class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    this.init();
  }

  init() {
    const currentPath = window.location.pathname;

    renderRoute(this.routes, currentPath);

    window.addEventListener('navigate', (event) => {
      const { path } = (event as CustomEvent).detail;
      renderRoute(this.routes, path, window.location.pathname);
      window.history.pushState({}, '', path);
    });
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

export const navigate = (path: string) => {
  const navigateEvent = new CustomEvent('navigate', {
    detail: { path },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
