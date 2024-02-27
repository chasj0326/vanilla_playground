import { makeRequest, makeRequestAll } from '@core';
import { emojiApi } from '@notion/api';
import { EmojiCategories, EmojiList, EmojiByCategory } from '@notion/types';

const getEmojiByCategory = (categories: string[]) => {
  const fetchFns = categories.map(
    (category) => () => emojiApi.getEmojiByCategory(category)
  );
  makeRequestAll<EmojiByCategory, EmojiList[]>(fetchFns, {
    select: (data) =>
      data.reduce((result, emojis, i) => {
        if (!emojis) return result;
        return {
          ...result,
          [categories[i]]: emojis.map(({ character }) => character),
        };
      }, {}),
    onSuccess: (data) => {
      console.log(data);
    },
  });
};

export const getAllEmoji = () => {
  makeRequest<string[], EmojiCategories>(() => emojiApi.getCategories(), {
    select: (data) => {
      return data.map(({ slug }) => slug);
    },
    onSuccess: (data) => {
      getEmojiByCategory(data);
    },
  });
};
