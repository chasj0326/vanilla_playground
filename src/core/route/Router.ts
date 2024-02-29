import { Route, RouteWithParams } from './routes';
import routeWorker from './routeWorker';

interface RouterOptions {
  onNavigate?: (route: RouteWithParams | null) => void;
  onPopState?: (route: RouteWithParams | null) => void;
}

class Router {
  routes;
  render;
  match;
  prevUrl;
  options;

  constructor(routes: Route[], routerOptions?: RouterOptions) {
    this.routes = routes;
    this.options = routerOptions;

    const worker = routeWorker(this.routes);

    this.prevUrl = '';

    this.render = (url: string) => {
      worker.render(url, this.prevUrl);
      this.prevUrl = url;
    };
    this.match = () => worker.match(window.location.pathname);
  }

  init() {
    this.render(window.location.pathname);

    window.addEventListener('navigate', (event) => {
      const { url } = (event as CustomEvent).detail;
      window.history.pushState({}, '', url);

      if (this.options?.onNavigate) {
        this.options.onNavigate(this.match());
      }

      this.render(url);
    });

    window.addEventListener('popstate', () => {
      if (this.options?.onPopState) {
        this.options.onPopState(this.match());
      }
      this.render(window.location.pathname);
    });
  }
}

const createRouter = (routes: Route[], routerOptions?: RouterOptions) =>
  new Router(routes, routerOptions);

export const navigate = (url: string) => {
  const navigateEvent = new CustomEvent('navigate', {
    detail: { url },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
