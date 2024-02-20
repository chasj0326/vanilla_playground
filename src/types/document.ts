export interface LeafDocument {
  id: number;
  title: string;
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
