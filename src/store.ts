import Store from './core/Store';
import { DirectoryData } from './types/data';

export const store = new Store();

export const directoryData = store.addData<DirectoryData>({
  key: 'directory',
  default: {
    currentId: 0,
    rootDocuments: [],
  },
});
