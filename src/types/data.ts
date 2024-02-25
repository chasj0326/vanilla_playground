import { RootDocuments } from './response';
import { DocumentContent } from './response';

export interface DirectoryData {
  rootDocuments: RootDocuments;
  currentId: number;
}
export type EditorData = Omit<DocumentContent, 'documents'>;
