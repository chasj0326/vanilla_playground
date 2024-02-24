import '@notion/style.css';
import App from '@notion/App';
import { createRouter } from '@core';
import NotionPage from '@notion/pages/NotionPage';
import DocumentPage from '@notion/pages/DocumentPage';

const $app = document.querySelector<HTMLElement>('#app');
if ($app) {
  new App({ target: $app });
}

export const router = createRouter([
  {
    path: '/',
    component: NotionPage,
    children: [
      {
        path: '/:id',
        component: DocumentPage,
      },
    ],
  },
]);

router.init();
