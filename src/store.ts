import { Store } from '@/core';
import { DirectoryData } from '@/types';

export const store = new Store();

export const directoryData = store.addData<DirectoryData>({
  key: 'directory',
  default: {
    currentId: 0,
    rootDocuments: [],
  },
});
