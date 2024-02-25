import { RootDocuments } from './response';
import { DetailDocument } from './response';

export interface ToggleData {
  [id: number]: boolean;
}

export interface DirectoryData {
  rootDocuments: RootDocuments;
  currentId: number;
  toggleData: ToggleData;
}
export type EditorData = Omit<DetailDocument, 'documents'>;
