const debounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  let timerId: ReturnType<typeof setTimeout>;

  return (...args: any) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => callback(...args), delay);
  };
};

export default debounce;
