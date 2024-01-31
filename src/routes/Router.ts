import { Route } from './routes';
import routeWorker from './routeWorker';

class Router {
  routes;
  render;
  match;
  prevUrl;

  constructor(routes: Route[]) {
    this.routes = routes;

    const worker = routeWorker(this.routes);

    this.prevUrl = '';

    this.render = (url: string) => {
      worker.render(url, this.prevUrl);
      this.prevUrl = url;
    };
    this.match = worker.match;
  }

  init() {
    this.render(window.location.pathname);

    window.addEventListener('navigate', (event) => {
      const { url } = (event as CustomEvent).detail;
      window.history.pushState({}, '', url);
      this.render(url);
    });

    window.addEventListener('popstate', () => {
      this.render(window.location.pathname);
    });
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

export const navigate = (url: string) => {
  const navigateEvent = new CustomEvent('navigate', {
    detail: { url },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
