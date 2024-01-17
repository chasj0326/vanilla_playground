import HomePage from './pages/HomePage';
import CountPage from './pages/CountPage';
import createRouter from './routes/Router';
import './style.css';
import App from './App';
import AboutPage from './pages/AboutPage';
import PostPage from './pages/PostPage';
import DetailPage from './pages/DetailPage';
import Store from './store/Store';

const $app = document.querySelector<HTMLElement>('#app');
new App({ target: $app! });

export const store = new Store({
  name: 'chacha',
  age: 25,
});

export const router = createRouter([
  {
    path: '/',
    component: HomePage,
    children: [
      {
        path: '/count',
        component: CountPage,
      },
      {
        path: '/about',
        component: AboutPage,
      },
      {
        path: '/post',
        component: PostPage,
        children: [
          {
            path: '/:id',
            component: DetailPage,
          },
        ],
      },
    ],
  },
]);

router.init();
