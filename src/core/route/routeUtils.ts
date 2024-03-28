import { Params, Route, RouteWithParams } from "./routes";

export const parseQueryString = (queryString: string) => {
  const result: Record<string, string> = {};
  const keyValueList = queryString.substring(1).split("&");

  keyValueList.forEach((keyValue) => {
    const [key, value] = keyValue.split("=");
    result[key] = value;
  });
  return result;
};

const matchPathToUrl = (path: string, url: string) => {
  const params: Params = {};
  if (path === url) return { isMatched: true, params };

  const pathSegment = path.split("/");
  const urlSegment = url.split("/");

  const isMatched =
    pathSegment.length === urlSegment.length &&
    pathSegment.every((seg, i) => {
      if (seg === urlSegment[i]) return true;

      if (urlSegment[i].includes("?")) {
        const [realUrlSegment] = urlSegment[i].split("?");
        if (realUrlSegment === seg) return true;
      }

      if (seg.startsWith(":")) {
        params[seg.slice(1)] = urlSegment[i];
        return true;
      }
      return false;
    });
  return { isMatched, params };
};

export const findMatchingRoutes = (routes: Route[], url: string) => {
  const routeFromRoot: RouteWithParams[] = [];

  const findRoute = (
    routes: Route[],
    currentPath: string,
  ): RouteWithParams | null => {
    for (const route of routes) {
      const path = (currentPath + route.path).replace("//", "/");
      const { isMatched, params } = matchPathToUrl(path, url);

      if (isMatched) {
        return { ...route, params };
      }
      if (route.children) {
        const childRoute = findRoute(route.children, path);

        if (childRoute) {
          routeFromRoot.push({ ...route, params: {} });
          return childRoute;
        }
      }
    }
    return null;
  };

  const matchedRoute = findRoute(routes, "/");
  if (matchedRoute) routeFromRoot.unshift(matchedRoute);
  return { match: matchedRoute, routes: routeFromRoot };
};
