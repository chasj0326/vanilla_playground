import '@notion/style.css';
import App from '@notion/App';
import { createRouter } from '@core';
import { MainPage, DocumentPage } from '@notion/pages';

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
        path: '/:id',
        component: DocumentPage,
      },
    ],
  },
]);

router.init();
