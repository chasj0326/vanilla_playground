import { Store } from "@core";
import {
  DirectoryData,
  EditorData,
  EmojiData,
  GuestBookData,
  InfiniteEmojiData,
} from "@notion/types";

export const store = new Store();

export const directoryData = store.addData<DirectoryData>({
  key: "directory",
  default: {
    currentId: 0,
    rootDocuments: [],
    toggleData: {},
  },
});

export const editorData = store.addData<EditorData>({
  key: "editor",
  default: {
    id: 0,
    title: "",
    content: "",
    updatedAt: "",
    createdAt: "",
  },
});

export const emojiData = store.addData<EmojiData>({
  key: "emoji",
  default: {
    categories: [],
    emojiMap: {},
  },
});

export const infiniteEmojiData = store.addData<InfiniteEmojiData>({
  key: "infinite-emoji",
  default: {
    cursor: 0,
    done: false,
    scrollTop: 0,
  },
});

export const guestBookData = store.addData<GuestBookData>({
  key: "guest-book",
  default: {},
});
