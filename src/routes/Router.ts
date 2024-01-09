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

    this.init();
  }

  init() {
    this.render(window.location.pathname);

    window.addEventListener('navigate', (event) => {
      const { path } = (event as CustomEvent).detail;
      this.render(path, window.location.pathname);
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
