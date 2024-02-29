import '@notion/style/style.css';
import App from '@notion/App';
import { createRouter } from '@core';
import { MainPage, DocumentPage } from '@notion/pages';
import Emoji from '@notion/components/Emoji';
import { store, directoryData } from '@notion/store';
import { DirectoryData } from '@notion/types';

const $app = document.querySelector<HTMLElement>('#app');
if ($app) {
  new App({ target: $app });
}

export const router = createRouter(
  [
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
  ],
  {
    onPopState: (route) => {
      const documentId = route?.params.id ?? '';
      const setDirectoryData = store.setData<DirectoryData>(directoryData);
      setDirectoryData((prev) => ({
        ...prev,
        currentId: Number(documentId),
      }));
    },
  }
);

router.init();
