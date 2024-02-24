import { createApiClient } from '@core';

const apiClient = createApiClient(import.meta.env.VITE_BASE_URL, {
  headers: {
    'x-username': import.meta.env.VITE_USERNAME,
    'Content-Type': 'application/json',
  },
});

export default apiClient;
