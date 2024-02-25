import { Route } from './routes';
import { findMatchingRoutes } from './routeUtils';
import { paintOutletElement, removeOutletElement } from './domUtils';

export const renderRoute = (
  routes: Route[],
  nextPath: string, // 이동해야 하는 주소
  prevPath?: string // 현재 주소
) => {
  const { routes: prevRoutes } = findMatchingRoutes(routes, prevPath ?? '/');

  const { routes: nextRoutes } = findMatchingRoutes(routes, nextPath);

  let renderStart = !prevPath;
  let depth = 0;

  while (nextRoutes.length) {
    const nextRoute = nextRoutes.pop();
    const prevRoute = prevRoutes.pop();

    if (
      (renderStart ||
        JSON.stringify(nextRoute) !== JSON.stringify(prevRoute)) &&
      nextRoute
    ) {
      renderStart = true;
      paintOutletElement(depth, nextRoute.component);
    }
    depth += 1;
  }

  while (prevRoutes.length) {
    prevRoutes.pop();
    removeOutletElement(depth);
    depth += 1;
  }
};
