import { createApiClient } from '@core';

export const notionApiClient = createApiClient(
  import.meta.env.VITE_NOTION_BASE_URL,
  {
    headers: {
      'x-username': import.meta.env.VITE_USERNAME,
      'Content-Type': 'application/json',
    },
  }
);

export const emojiApiClient = createApiClient(
  import.meta.env.VITE_EMOJI_BASE_URL,
  {
    headers: {
      'Content-Type': 'application/json',
    },
  }
);
