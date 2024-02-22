export interface LeafDocument {
  id: string;
  title: string;
  documents: LeafDocument[];
}

export interface RootDocuments extends Array<LeafDocument> {}

export interface DocumentContent {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  documents: Omit<DocumentContent, 'content' | 'documents'>[];
}
