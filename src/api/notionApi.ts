import { createApi } from '@/core';

export const notionApi = createApi(import.meta.env.VITE_BASE_URL, {
  headers: {
    'x-username': import.meta.env.VITE_USERNAME,
    'Content-Type': 'application/json',
  },
});
