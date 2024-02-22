import Store from '../core/Store';

export const store = new Store();

export const documentIdData = store.addData<number>({
  key: 'current-document-id',
  default: 0,
});
