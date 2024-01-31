import Store from '../core/Store';

export const store = new Store();

export interface UserInfo {
  name: string;
  age: number;
}

export const userInfo = store.addData<UserInfo>({
  key: 'user-info',
  default: {
    name: 'chacha',
    age: 25,
  },
});

export const postItems = store.addData<number[]>({
  key: 'post-item',
  default: [1, 2, 3, 4, 5],
});
