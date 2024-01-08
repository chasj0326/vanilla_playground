import { Route } from './routes';

const isMatched = (path: string, route: string) => {
  if (path === route) return true;
  const segment1 = path.split('/');
  const segment2 = route.split('/');
  return (
    segment1.length === segment2.length &&
    segment1.every(
      (seg, i) => seg === segment2[i] || segment2[i].startsWith(':')
    )
  );
};

export const matchRoutes = (routes: Route[], path: string) => {
  const matchedRoutes: Route[] = [];

  const match = (routes: Route[], current: string): Route | null => {
    for (const route of routes) {
      const routePath = (current + route.path).replace('//', '/');
      if (isMatched(path, routePath)) return route;
      if (route.children) {
        const childRoute = match(route.children, routePath);
        if (childRoute) {
          matchedRoutes.push(route);
          return childRoute;
        }
      }
    }
    return null;
  };

  const matchedRoute = match(routes, '/');
  if (matchedRoute) matchedRoutes.unshift(matchedRoute);
  return { matches: matchedRoutes, route: matchedRoute };
};

const findOutlet = (depth: number) => {
  const selector = Array(depth).fill('#outlet').join(' > ') || '#app';
  return document.querySelector<HTMLElement>(selector);
};

export const renderRoute = (
  routes: Route[],
  next: string,
  prev = '/'
) => {
  const { matches: prevRoutes } = matchRoutes(routes, prev);
  const { matches: nextRoutes } = matchRoutes(routes, next);

  let renderStart = false;
  let depth = 0;
  while (nextRoutes.length) {
    const nextRoute = nextRoutes.pop();
    prevRoutes.pop();

    if (
      (renderStart =
        nextRoutes.length === 0 ||
        nextRoutes.at(-1) !== prevRoutes.at(-1))
    ) {
      nextRoute?.component();
    }
    depth += 1;
  }
};
