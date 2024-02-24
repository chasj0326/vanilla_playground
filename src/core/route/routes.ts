import Component from '../component/Component';

export interface Params {
  [key: string]: string;
}

export interface Route {
  path: string;
  component: typeof Component;
  children?: Route[];
}

export type RouteWithParams = Route & {
  params: Params;
};
