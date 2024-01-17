import Store from '../store/Store';

export const store = new Store();

export const age = store.addData({
  key: 'age',
  default: 25,
});

export const name = store.addData({
  key: 'name',
  default: 'chacha',
});
