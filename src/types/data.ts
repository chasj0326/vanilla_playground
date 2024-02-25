import { RootDocuments } from './response';
import { DetailDocument } from './response';

export interface DirectoryData {
  rootDocuments: RootDocuments;
  currentId: number;
}
export type EditorData = Omit<DetailDocument, 'documents'>;
