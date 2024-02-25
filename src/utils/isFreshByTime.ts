const isFreshByTime = (serverTime: Date, storedTime: Date) => {
  const diff = serverTime.getTime() - storedTime.getTime();
  return diff >= 0;
};

export default isFreshByTime;
