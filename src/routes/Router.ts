import { Route } from './routes';

const findRoute = (routes: Route[], path: string): Route | null => {
  for (const route of routes) {
    const routeSegments = route.path.split('/');
    const pathSegments = path.split('/');

    if (
      routeSegments.length === pathSegments.length &&
      pathSegments.every(
        (seg, i) =>
          seg === routeSegments[i] || routeSegments[i].startsWith(':')
      )
    ) {
      return route;
    }

    if (route.children) {
      const childRoute = findRoute(
        route.children,
        pathSegments.slice(1).join('/')
      );
      if (childRoute) return childRoute;
    }
  }
  return null;
};

class Router {
  routes: Route[];

  constructor(routes: Route[]) {
    this.routes = routes;
    this.init();
  }

  init() {
    const currentPath = window.location.pathname;
    const currentRoute = findRoute(this.routes, currentPath);
    if (currentRoute) {
      currentRoute.component();
    }
  }
}

const createRouter = (routes: Route[]) => new Router(routes);

export default createRouter;
