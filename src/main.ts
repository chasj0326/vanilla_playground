import HomePage from './pages/HomePage';
import CountPage from './pages/CountPage';
import createRouter from './routes/Router';
import './style.css';
import ListPage from './pages/ListPage';
import App from './App';
import AboutPage from './pages/AboutPage';
import PostPage from './pages/PostPage';
import DetailPage from './pages/DetailPage';

const $app = document.querySelector<HTMLElement>('#app');
new App({ target: $app! });

export const router = createRouter([
  {
    path: '/',
    component: (target) => {
      new HomePage({ target });
    },
    children: [
      {
        path: '/count',
        component: (target) => new CountPage({ target }),
      },
      {
        path: '/about',
        component: (target) => new AboutPage({ target }),
      },
      {
        path: '/list',
        component: (target) => new ListPage({ target }),
        children: [
          {
            path: '/item1',
            component: (page) => {
              page.innerHTML = `<p>item1 페이지 입니다</p>`;
            },
          },
          {
            path: '/item2',
            component: (page) => {
              page.innerHTML = `<p>item2 페이지 입니다</p>`;
            },
          },
        ],
      },
      {
        path: '/post',
        component: (target) => new PostPage({ target }),
      },
      {
        path: '/post/:id',
        component: (target) => new DetailPage({ target }),
      },
    ],
  },
]);

router.init();
