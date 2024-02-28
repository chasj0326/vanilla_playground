import { makeRequest } from '@core';
import { emojiApi } from '@notion/api';
import {
  EmojiCategories,
  EmojiList,
  EmojiByCategory,
  EmojiData,
  InfiniteEmojiData,
} from '@notion/types';
import { store, emojiData, infiniteEmojiData } from '@notion/store';

export const getInfiniteEmoji = () => {
  const [{ categories, cursor }, setInfiniteEmojiData] =
    store.useData<InfiniteEmojiData>(infiniteEmojiData);

  const setEmojiData = store.setData<EmojiData>(emojiData);
  makeRequest<EmojiByCategory, EmojiList>(
    () => emojiApi.getEmojiByCategory(categories[cursor]),
    {
      select: (data) => {
        return { [categories[cursor]]: data.map(({ character }) => character) };
      },
      onSuccess: (data) => {
        setEmojiData((prev) => ({
          ...prev,
          emojiMap: { ...prev.emojiMap, ...data },
        }));
        setInfiniteEmojiData((prev) => ({
          ...prev,
          cursor: prev.cursor + 1,
          done: cursor === categories.length - 1,
        }));
      },
    }
  );
};

export const getEmojiCategory = () => {
  const [{ cursor }, setInfiniteEmojiData] =
    store.useData<InfiniteEmojiData>(infiniteEmojiData);
  makeRequest<string[], EmojiCategories>(() => emojiApi.getCategories(), {
    select: (data) => {
      return data.map(({ slug }) => slug);
    },
    onSuccess: (data) => {
      if (cursor === 0) {
        setInfiniteEmojiData((prev) => ({
          ...prev,
          categories: data.filter((emoji) => emoji !== 'component'),
        }));
        getInfiniteEmoji();
      }
    },
  });
};
