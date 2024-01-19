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
  updateQueue: Set<keyof Data> = new Set();

  constructor() {
    this.data = {};
    this.channel = {};
  }

  subscribe(keyList: (keyof Data)[], func: VoidFunction) {
    keyList.forEach((key) => this.channel[key].push(func));
  }

  #notify(key: keyof Data) {
    console.log(key);
    this.channel[key].forEach((fn) => {
      fn();
    });
  }

  async flushUpdateQueue() {
    for (const key of this.updateQueue) {
      this.#notify(key);
    }
    this.updateQueue.clear();
  }

  getData(key: keyof Data) {
    return this.data[key].value;
  }

  setData<T>(key: keyof Data) {
    return (value: T) => {
      const oldValue = this.data[key].value;

      if (typeof value === 'function') {
        this.data[key].value = value(this.data[key].value);
      } else {
        this.data[key].value = value;
      }

      if (!isSameValue(oldValue, value)) {
        this.updateQueue.add(key);
        Promise.resolve().then(() => this.flushUpdateQueue());
      }
    };
  }

  resetData(key: keyof Data) {
    return () => {
      const oldValue = this.data[key].value;
      this.data[key].value = this.data[key].default;

      if (!isSameValue(oldValue, this.data[key].default)) {
        this.updateQueue.add(key);
        Promise.resolve().then(() => this.flushUpdateQueue());
      }
    };
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
