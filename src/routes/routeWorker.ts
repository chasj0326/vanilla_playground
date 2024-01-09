import { Route } from './routes';

const routeWorker = (routes: Route[]) => {
  const render = (nextRoute: string, prevRoute?: string) =>
    renderRoute(routes, nextRoute, prevRoute);

  const match = (path: string) => findMatchingRoutes(routes, path);

  return { render, match };
};

const matchRouteToPath = (route: string, path: string) => {
  const params: { [key: string]: string } = {};
  if (path === route) return { isMatched: true, params };

  const routeSegment = route.split('/');
  const pathSegment = path.split('/');

  const isMatched =
    routeSegment.length === pathSegment.length &&
    routeSegment.every((seg, i) => {
      if (seg === pathSegment[i]) return true;
      else if (seg.startsWith(':')) {
        params[seg.slice(1)] = pathSegment[i];
        return true;
      }
      return false;
    });
  return { isMatched, params };
};

export const findMatchingRoutes = (routes: Route[], path: string) => {
  const routeFromRoot: Route[] = [];

  const findRoute = (
    routes: Route[],
    current: string
  ): (Route & { params: { [key: string]: string } }) | null => {
    for (const route of routes) {
      const routePath = (current + route.path).replace('//', '/');
      const { isMatched, params } = matchRouteToPath(routePath, path);

      if (isMatched) {
        return { ...route, params };
      }
      if (route.children) {
        const childRoute = findRoute(route.children, routePath);

        if (childRoute) {
          routeFromRoot.push(route);
          return childRoute;
        }
      }
    }
    return null;
  };

  const matchedRoute = findRoute(routes, '/');
  if (matchedRoute) routeFromRoot.unshift(matchedRoute);
  return { match: matchedRoute, routes: routeFromRoot };
};

const getOutletElement = (depth: number) => {
  const selector = Array(depth).fill('#outlet').join(' > ') || '#app';
  return document.querySelector<HTMLElement>(selector);
};

export const renderRoute = (
  routes: Route[],
  nextRoute: string,
  prevRoute?: string
) => {
  const { routes: prevRoutes } = findMatchingRoutes(
    routes,
    prevRoute ?? '/'
  );
  const { routes: nextRoutes } = findMatchingRoutes(
    routes,
    nextRoute
  );

  let renderStart = !prevRoute || nextRoute === '/';
  let depth = 0;

  while (nextRoutes.length) {
    const nextRoute = nextRoutes.pop();
    const prevRoute = prevRoutes.pop();

    if (renderStart || nextRoute?.path !== prevRoute?.path) {
      renderStart = true;
      nextRoute?.component(getOutletElement(depth)!);
    }
    depth += 1;
  }
};

export default routeWorker;
