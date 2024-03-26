type Default = Record<string, any>;

const transformAPI = <From extends Default, To extends Default>(
  initialObj: Partial<To>,
) => {
  const targetKeys = Object.keys(initialObj);

  // 보낼때 JSON 문자열로 바꾸기
  const reduceValue = (target: any) => {
    return `${JSON.stringify(target)}`;
  };

  // 받을때 객체로 바꾸기
  const expandValue = (key: string, target: string) => {
    if (target === "") return initialObj[key];
    return JSON.parse(target);
  };

  const reduceRequest = (requestBody: To): From => {
    const result: Default = {};
    for (const key of Object.keys(requestBody)) {
      if (targetKeys.includes(key)) {
        result[key] = reduceValue(requestBody[key]);
      } else {
        result[key] = requestBody[key];
      }
    }
    return result as From;
  };

  const expandResponse = (responseBody: From): To => {
    const result: Default = {};
    for (const key of Object.keys(responseBody)) {
      if (targetKeys.includes(key)) {
        result[key] = expandValue(key, responseBody[key]);
      } else {
        result[key] = responseBody[key];
      }
    }
    return result as To;
  };

  return { reduceRequest, expandResponse };
};
