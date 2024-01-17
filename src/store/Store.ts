interface Data {
  [key: string]: any;
}
// { age: 10, name: 'ddd' }

interface Channel {
  [key: string]: VoidFunction[];
}
// { age: [render, render,...], name: [render, render...] }

class Store {
  data: Data;
  channel: Channel;

  constructor(initialData: Data) {
    this.data = initialData;
    this.channel = Object.keys(initialData).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {} as Channel);
  }

  subscribe(key: keyof Data, func: VoidFunction) {
    if (!(key in this.channel)) {
      console.error(`${key} not in store`);
    }
    this.channel[key].push(func);
  }

  notify(key: keyof Data) {
    this.channel[key].forEach((fn) => {
      fn();
    });
  }

  get(key: keyof Data) {
    return this.data[key];
  }

  set(key: keyof Data, value: any) {
    if (typeof value === 'function') {
      this.data[key] = value(this.data[key]);
    } else {
      this.data[key] = value;
    }
    this.notify(key);
  }
}

export default Store;

// const age = store.add('age', 20);

// component1
// const age = getData(age); // 이 컴포넌트!
// <div>${age}</div>

// component2
// const setAge = setData(age);
// setAge(25);
// component1 렌더링
