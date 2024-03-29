import { RootDocuments } from "./response";
import { DetailDocument } from "./response";

export interface ToggleData {
  [id: number]: boolean;
}

export interface DirectoryData {
  rootDocuments: RootDocuments;
  currentId: number;
  toggleData: ToggleData;
}
export type EditorData = Omit<DetailDocument, "documents">;

export interface EmojiByCategory {
  [category: string]: string[];
}

export interface EmojiData {
  emojiMap: EmojiByCategory;
  categories: string[];
}

export interface InfiniteEmojiData {
  cursor: number;
  done: boolean;
  scrollTop: number;
}

export interface Profile {
  charactor: string;
  background: string;
}

export interface GuestContent {
  username: string;
  content: string;
  password: string;
  updateAt: string;
  profile: Profile;
}

export interface GuestBookData {
  [id: string]: GuestContent;
}
