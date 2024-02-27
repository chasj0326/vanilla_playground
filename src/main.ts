import '@notion/style/style.css';
import App from '@notion/App';
import { createRouter } from '@core';
import { MainPage, DocumentPage } from '@notion/pages';
import Emoji from './components/Emoji';

const $app = document.querySelector<HTMLElement>('#app');
if ($app) {
  new App({ target: $app });
}

export const router = createRouter([
  {
    path: '/',
    component: MainPage,
    children: [
      {
        path: '/emoji',
        component: Emoji,
      },
      {
        path: '/:id',
        component: DocumentPage,
      },
    ],
  },
]);

router.init();
