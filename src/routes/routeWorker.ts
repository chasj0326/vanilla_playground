import { Route } from './routes';
import { renderRoute } from './renderRoute';
import { findMatchingRoutes } from './routeUtils';

const routeWorker = (routes: Route[]) => {
  const render = (nextRoute: string, prevRoute?: string) =>
    renderRoute(routes, nextRoute, prevRoute);

  const match = (path: string) => findMatchingRoutes(routes, path);

  return { render, match };
};

export default routeWorker;
