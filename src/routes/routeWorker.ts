import { Route } from './routes';

const routeWorker = (routes: Route[]) => {
  const render = (nextRoute: string, prevRoute?: string) =>
    renderRoute(routes, nextRoute, prevRoute);

  const match = (path: string) => findMatchingRoutes(routes, path);

  return { render, match };
};

const matchPathToUrl = (path: string, url: string) => {
  const params: { [key: string]: string } = {};
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
    current: string
  ): (Route & { params: { [key: string]: string } }) | null => {
    for (const route of routes) {
      const path = (current + route.path).replace('//', '/');
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

const getOutletElement = (depth: number) => {
  const selector = Array(depth).fill('#outlet').join(' > ') || '#app';
  return document.querySelector<HTMLElement>(selector);
};

export const renderRoute = (
  routes: Route[],
  nextPath: string, // 이동해야 하는 주소
  prevPath?: string // 현재 주소
) => {
  // '/list/item1' => [{} , {} ..] => [{'/item1'}, {'/list'}, {'/'}]
  const { routes: prevRoutes } = findMatchingRoutes(
    routes,
    prevPath ?? '/'
  );

  // '/list/item2' => [{'/item2'}, {'/list'}, {'/'}]
  const { routes: nextRoutes } = findMatchingRoutes(routes, nextPath);

  // !prevRoute => 처음부터 렌더링
  // 가야하는 주소가 홈이다.. 그렇다는 것은 처음부터 해야한다..
  let renderStart = !prevPath || nextPath === '/';
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
