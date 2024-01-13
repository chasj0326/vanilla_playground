import { Route } from './routes';
import routeWorker from './routeWorker';

class Router {
  routes;
  render;
  match;

  constructor(routes: Route[]) {
    this.routes = routes;

    const worker = routeWorker(this.routes);
    this.render = worker.render;
    this.match = worker.match;
  }

  init() {
    this.render(window.location.pathname);

    window.addEventListener('navigate', (event) => {
      const { path, prevPath } = (event as CustomEvent).detail;
      window.history.pushState({}, '', path);
      this.render(path, prevPath);
    });
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

export const navigate = (path: string) => {
  const navigateEvent = new CustomEvent('navigate', {
    detail: { path, prevPath: window.location.pathname },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
