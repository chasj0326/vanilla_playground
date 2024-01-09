import { Params, RouteWithParams, Route } from './routes';

const matchPathToUrl = (path: string, url: string) => {
  const params: Params = {};
  if (path === url) return { isMatched: true, params };

  const pathSegment = path.split('/');
  const urlSegment = url.split('/');

  const isMatched =
    pathSegment.length === urlSegment.length &&
    pathSegment.every((seg, i) => {
      if (seg === urlSegment[i]) return true;
      else if (seg.startsWith(':')) {
        params[seg.slice(1)] = urlSegment[i];
        return true;
      }
      return false;
    });
  return { isMatched, params };
};

export const findMatchingRoutes = (routes: Route[], url: string) => {
  const routeFromRoot: Route[] = [];

  const findRoute = (
    routes: Route[],
    currentPath: string
  ): RouteWithParams | null => {
    for (const route of routes) {
      const path = (currentPath + route.path).replace('//', '/');
      const { isMatched, params } = matchPathToUrl(path, url);

      if (isMatched) {
        return { ...route, params };
      }
      if (route.children) {
        const childRoute = findRoute(route.children, path);

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
