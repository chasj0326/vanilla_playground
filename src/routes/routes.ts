export interface Params {
  [key: string]: string;
}

export interface Route {
  path: string;
  component: (page: HTMLElement) => void;
  children?: Route[];
}

export interface RouteWithParams {
  path: string;
  component: (page: HTMLElement) => void;
  children?: Route[];
  params: Params;
}
