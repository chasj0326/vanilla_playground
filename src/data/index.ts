import Store from '../store/Store';

export const store = new Store();

// export const age = store.addData({
//   key: 'age',
//   default: 25,
// });

// export const name = store.addData({
//   key: 'name',
//   default: 'chacha',
// });

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
