interface Data {
  [key: string]: {
    default: any;
    value: any;
  };
}

interface Channel {
  [key: string]: VoidFunction[];
}

const isSameValue = <T>(oldValue: T, newValue: T) => {
  return JSON.stringify(oldValue) === JSON.stringify(newValue);
};

class Store {
  data: Data;
  channel: Channel;

  constructor() {
    this.data = {};
    this.channel = {};
  }

  subscribe(key: keyof Data, func: VoidFunction) {
    this.channel[key].push(func);
  }

  #notify(key: keyof Data) {
    this.channel[key].forEach((fn) => {
      fn();
    });
  }

  getData(key: keyof Data) {
    return this.data[key].value;
  }

  setData(key: keyof Data, value: any) {
    const oldValue = this.data[key].value;

    if (typeof value === 'function') {
      this.data[key].value = value(this.data[key].value);
    } else {
      this.data[key].value = value;
    }

    if (!isSameValue(oldValue, value)) {
      this.#notify(key);
    }
  }

  resetData(key: keyof Data) {
    const oldValue = this.data[key].value;
    this.data[key].value = this.data[key].default;

    if (!isSameValue(oldValue, this.data[key].default)) {
      this.#notify(key);
    }
  }

  addData<T>({
    key,
    default: defaultValue,
  }: {
    key: string;
    default: T;
  }) {
    this.data[key] = { default: defaultValue, value: defaultValue };
    this.channel[key] = [];
    return key;
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
