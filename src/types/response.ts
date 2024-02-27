export interface LeafDocument {
  id: number;
  title: string | null;
  documents: LeafDocument[];
}

export interface RootDocuments extends Array<LeafDocument> {}

export interface DetailDocument {
  id: number;
  title: string;
  content: string | null;
  createdAt: string;
  updatedAt: string;
  documents: Omit<DetailDocument, 'content' | 'documents'>[];
}

export interface CreatedDocument {
  id: number;
  title: string;
  createAt: string;
  updateAt: string;
}

export interface EmojiCategory {
  slug: string;
  subCategories: string[];
}

export type EmojiCategories = EmojiCategory[];

export type EmojiList = Emoji[];

export interface Emoji {
  slug: string;
  character: string;
  unicodeName: string;
  codePoint: string;
  group: string;
  subGroup: string;
}
