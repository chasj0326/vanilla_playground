import { Store } from '@core';
import { DirectoryData, EditorData } from '@notion/types';

export const store = new Store();

export const directoryData = store.addData<DirectoryData>({
  key: 'directory',
  default: {
    currentId: 0,
    rootDocuments: [],
  },
});

export const editorData = store.addData<EditorData>({
  key: 'editor',
  default: {
    id: 0,
    title: '',
    content: '',
    updatedAt: '',
    createdAt: '',
  },
});
