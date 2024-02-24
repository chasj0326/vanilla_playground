import '@/style.css';
import App from '@/App';
import { createRouter } from '@/core';
import NotionPage from './pages/NotionPage';
import DocumentPage from './pages/DocumentPage';

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
