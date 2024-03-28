import { renderRoute } from "./renderRoute";
import { findMatchingRoutes, parseQueryString } from "./routeUtils";
import { Route } from "./routes";

const routeWorker = (routes: Route[]) => {
  const render = (nextRoute: string, prevRoute?: string) =>
    renderRoute(routes, nextRoute, prevRoute);

  const match = (location: Location) => ({
    ...findMatchingRoutes(routes, location.pathname).match,
    search: parseQueryString(location.search),
  });

  return { render, match };
};

export default routeWorker;
