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

// 'user-info'
