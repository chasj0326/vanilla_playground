interface Data {
  [key: symbol]: {
    default: any;
    value: any;
  };
}

interface Listener {
  key: string;
  func: VoidFunction;
  option?: {
    "non-strict": boolean;
  };
}

interface Channel {
  [key: symbol]: Listener[];
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

  validateKey(keyList: (keyof Data)[]) {
    if (!keyList.every((key) => key in this.channel && key in this.data)) {
      throw new Error("Invalid Key in Data");
    }
  }

  subscribe(keyList: (keyof Data)[], listener: Listener) {
    this.validateKey(keyList);
    for (const key of keyList) {
      if (
        this.channel[key].some((subscribed) => subscribed.key === listener.key)
      ) {
        if (listener.option?.["non-strict"]) {
          this.channel[key].push(listener);
        } else {
          this.channel[key] = this.channel[key].filter(
            (suscribed) => suscribed.key !== listener.key,
          );
        }
      }
      this.channel[key].push(listener);
    }
  }

  #notify(key: keyof Data) {
    this.channel[key].forEach(({ func }) => {
      func();
    });
  }

  async flushUpdateQueue() {
    for (const key of this.updateQueue) {
      this.#notify(key);
    }
    this.updateQueue.clear();
  }

  addData<T>({ key, default: defaultValue }: { key: string; default: T }) {
    const uniqueKey = Symbol(key);
    this.data[uniqueKey] = { default: defaultValue, value: defaultValue };
    this.channel[uniqueKey] = [];
    return uniqueKey;
  }

  getData<T = any>(key: keyof Data) {
    this.validateKey([key]);
    return this.data[key].value as T;
  }

  setData<T = any>(key: keyof Data) {
    this.validateKey([key]);
    return (value: T | ((x: T) => T)) => {
      if (typeof value === "function") {
        this.data[key].value = (value as (x: T) => void)(this.data[key].value);
      } else {
        this.data[key].value = value;
      }

      this.updateQueue.add(key);
      Promise.resolve().then(() => this.flushUpdateQueue());
    };
  }

  useData<T>(key: keyof Data) {
    return [this.getData<T>(key), this.setData<T>(key)] as const;
  }

  resetData(key: keyof Data) {
    this.validateKey([key]);
    return () => {
      const oldValue = this.data[key].value;
      this.data[key].value = this.data[key].default;

      if (!isSameValue(oldValue, this.data[key].default)) {
        this.updateQueue.add(key);
        Promise.resolve().then(() => this.flushUpdateQueue());
      }
    };
  }
}

export default Store;
