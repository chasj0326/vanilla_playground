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
      const { url, prevUrl } = (event as CustomEvent).detail;
      window.history.pushState({}, '', url);
      this.render(url, prevUrl);
    });
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

export const navigate = (url: string) => {
  const navigateEvent = new CustomEvent('navigate', {
    detail: { url, prevUrl: window.location.pathname },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
