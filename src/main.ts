import HomePage from './pages/HomePage';
import CountPage from './pages/CountPage';
import createRouter from './routes/Router';
import './style.css';
import AboutPage from './pages/AboutPage';
import ListPage from './pages/ListPage';
import App from './App';

const $app = document.querySelector<HTMLElement>('#app');
new App({ target: $app! });

export const router = createRouter([
  {
    path: '/',
    component: (target) => new HomePage({ target }),
    children: [
      {
        path: '/about',
        component: (target) => new AboutPage({ target }),
      },
      {
        path: '/count',
        component: (target) => new CountPage({ target }),
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
    ],
  },
]);
