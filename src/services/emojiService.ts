import { makeRequest } from '@core';
import { emojiApi } from '@notion/api';
import {
  EmojiCategories,
  EmojiList,
  EmojiByCategory,
  EmojiData,
  InfiniteEmojiData,
  StoredEmojiList,
} from '@notion/types';
import { store, emojiData, infiniteEmojiData } from '@notion/store';
import { storage } from '@core';
import { STORAGE_KEY } from '@notion/constants';

const sessionStorage = storage(window.sessionStorage);

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

export const getStoredEmoji = () => {
  const storedEmojiList = sessionStorage.getItem<StoredEmojiList>({
    key: STORAGE_KEY.EMOJI,
    default: [],
  });
  return {
    'recently-used': storedEmojiList,
  };
};

export const storeEmoji = (emoji: string) => {
  const storedEmojiList = sessionStorage.getItem<StoredEmojiList>({
    key: STORAGE_KEY.EMOJI,
    default: [],
  });
  const newStoredEmoji = [...new Set([...storedEmojiList, emoji])];
  sessionStorage.setItem({
    key: STORAGE_KEY.EMOJI,
    value: newStoredEmoji,
  });
};
