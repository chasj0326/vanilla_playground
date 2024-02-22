import createApi from '../core/ApiClient';

export const notionApi = createApi(import.meta.env.VITE_BASE_URL, {
  headers: {
    'x-username': import.meta.env.VITE_USERNAME,
  },
});
