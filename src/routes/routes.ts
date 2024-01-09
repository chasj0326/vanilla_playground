import Component from '../core/Component';

export interface Route {
  path: string;
  component: (parent: HTMLElement) => void;
  children?: Route[];
}

export const routes: Route[] = [
  {
    path: '/',
    component: () => console.log('홈페이지입니다'),
    children: [
      {
        path: '/login',
        component: () => console.log('로그인페이지입니다'),
      },
      {
        path: '/list',
        component: () => console.log('목록페이지입니다'),
        children: [
          {
            path: '/item1',
            component: () => console.log('아이템1 페이지입니다'),
          },
          {
            path: '/item2',
            component: () => console.log('아이템2 페이지입니다'),
            children: [
              {
                path: '/child',
                component: () =>
                  console.log('아이템2의 서브아이템입니다'),
              },
            ],
          },
          {
            path: '/item3',
            component: () => console.log('아이템3 페이지입니다'),
          },
        ],
      },
      {
        path: '/post/:id',
        component: () => console.log('포스트 페이지입니다'),
      },
    ],
  },
  {
    path: '/test',
    component: () => console.log('테스트 페이지입니다'),
  },
];
