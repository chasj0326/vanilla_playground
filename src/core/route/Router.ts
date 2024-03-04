import routeWorker from "./routeWorker";
import { Route } from "./routes";

class Router {
  routes;
  render;
  match;
  prevUrl;

  constructor(routes: Route[]) {
    this.routes = routes;

    const worker = routeWorker(this.routes);

    this.prevUrl = "";

    this.render = (url: string) => {
      worker.render(url, this.prevUrl);
      this.prevUrl = url;
    };
    this.match = () => worker.match(window.location.pathname);
  }

  init() {
    this.render(window.location.pathname);

    window.addEventListener("navigate", (event) => {
      const { url, option } = (event as CustomEvent).detail;
      if (option.replace) {
        window.history.replaceState({}, "", url);
      } else {
        window.history.pushState({}, "", url);
      }
      this.render(url);
    });

    window.addEventListener("popstate", () => {
      this.render(window.location.pathname);
    });
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

interface NavigateOption {
  replace: boolean;
}

export const navigate = (url: string, option?: NavigateOption) => {
  const navigateEvent = new CustomEvent("navigate", {
    detail: { url, option },
  });
  window.dispatchEvent(navigateEvent);
};

export default createRouter;
