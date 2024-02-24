import { RootDocuments } from './response';

export interface DirectoryData {
  rootDocuments: RootDocuments;
  currentId: number;
}

export interface EditorData {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
