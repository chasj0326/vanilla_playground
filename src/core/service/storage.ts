const storage = (_storage = window.localStorage) => {
  const setItem = <T = any>({
    key,
    value,
  }: {
    key: string;
    value: T;
  }) => {
    _storage.setItem(key, JSON.stringify(value));
  };

  const getItem = <T = any>({
    key,
    default: defaultValue,
  }: {
    key: string;
    default: T;
  }): T => {
    if (!_storage.getItem(key)) setItem({ key, value: defaultValue });
    return JSON.parse(_storage.getItem(key)!);
  };

  const removeItem = (key: string) => {
    _storage.removeItem(key);
  };

  return {
    setItem,
    getItem,
    removeItem,
  };
};

export default storage;
