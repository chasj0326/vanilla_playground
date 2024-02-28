export interface StoredDocument {
  id: number;
  title: string;
  content: string | null;
  updatedAt: string;
}

export type StoredEmojiList = string[];
