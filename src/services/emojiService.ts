import { emojiApi } from "@notion/api";
import { makeRequest } from "@core";
import { storage } from "@core";
import { emojiData, infiniteEmojiData, store } from "@notion/store";
import {
  EmojiByCategory,
  EmojiCategories,
  EmojiData,
  EmojiList,
  InfiniteEmojiData,
  StoredEmojiList,
} from "@notion/types";
import { STORAGE_KEY } from "@notion/constants";

const sessionStorage = storage(window.sessionStorage);

const getInfiniteEmoji = () => {
  const [{ cursor }, setInfiniteEmojiData] =
    store.useData<InfiniteEmojiData>(infiniteEmojiData);
  const [{ categories }, setEmojiData] = store.useData<EmojiData>(emojiData);

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
    },
  );
};

const getEmojiCategory = () => {
  const { cursor } = store.getData<InfiniteEmojiData>(infiniteEmojiData);
  const setEmojiData = store.setData<EmojiData>(emojiData);
  makeRequest<string[], EmojiCategories>(() => emojiApi.getCategories(), {
    select: (data) => {
      return data.map(({ slug }) => slug);
    },
    onSuccess: (data) => {
      if (cursor === 0) {
        setEmojiData((prev) => ({
          ...prev,
          categories: data.filter((category) => category !== "component"),
        }));
      }
    },
  });
};

const getStoredEmoji = () => {
  const storedEmojiList = sessionStorage.getItem<StoredEmojiList>({
    key: STORAGE_KEY.EMOJI,
    default: [],
  });
  return {
    "recently-used": storedEmojiList,
  };
};

const storeEmoji = (emoji: string) => {
  const storedEmojiList = sessionStorage.getItem<StoredEmojiList>({
    key: STORAGE_KEY.EMOJI,
    default: [],
  });
  const newStoredEmoji = [
    ...storedEmojiList.filter((stored) => stored !== emoji),
    emoji,
  ];
  sessionStorage.setItem({
    key: STORAGE_KEY.EMOJI,
    value: newStoredEmoji,
  });
};

const emoji = {
  getInfiniteEmoji,
  getEmojiCategory,
  getStoredEmoji,
  storeEmoji,
};

export default emoji;
