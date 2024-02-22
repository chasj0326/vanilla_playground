export interface LeafDocument {
  id: number;
  title: string | null;
  documents: LeafDocument[];
}

export interface RootDocuments extends Array<LeafDocument> {}

export interface DocumentContent {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  documents: Omit<DocumentContent, 'content' | 'documents'>[];
}

export interface CreatedDocument {
  id: number;
  title: string;
  createAt: string;
  updateAt: string;
}
