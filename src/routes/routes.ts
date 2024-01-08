export interface Route {
  path: string;
  name: string;
  component: VoidFunction;
  children?: Route[];
}

export const routes: Route[] = [
  {
    path: '',
    name: '홈',
    component: () => console.log('홈페이지입니다'),
    children: [
      {
        path: 'login',
        name: '로그인',
        component: () => console.log('로그인페이지입니다'),
      },
      {
        path: 'list',
        name: '목록',
        component: () => console.log('목록페이지입니다'),
        children: [
          {
            path: 'item1',
            name: '아이템1',
            component: () => console.log('아이템1 페이지입니다'),
          },
          {
            path: 'item2',
            name: '아이템2',
            component: () => console.log('아이템2 페이지입니다'),
          },
          {
            path: 'item3',
            name: '아이템3',
            component: () => console.log('아이템3 페이지입니다'),
          },
        ],
      },
      {
        path: 'post/:id',
        name: '포스트',
        component: () => console.log('포스트 페이지입니다'),
      },
    ],
  },
];
