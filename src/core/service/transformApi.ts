type Default = Record<string, any>;

const transformAPI = <From extends Default, To extends Default>(
  initialObj: Partial<To>,
) => {
  const targetKeys = Object.keys(initialObj);

  // 보낼때 JSON 문자열로 바꾸기
  const reduceValue = (target: any) => {
    return JSON.stringify(target);
  };

  // 받을때 객체로 바꾸기
  const expandValue = (initial: any, target: string) => {
    if (target === "") return initial;
    return JSON.parse(target);
  };

  const reduceRequest = (expandedBody: To): From => {
    const requestBody: Default = {};
    for (const key of Object.keys(expandedBody)) {
      if (targetKeys.includes(key)) {
        requestBody[key] = reduceValue(expandedBody[key]);
      } else {
        requestBody[key] = expandedBody[key];
      }
    }
    return requestBody as From;
  };

  const expandResponse = (responseData: From): To => {
    const expandedData: Default = {};
    for (const key of Object.keys(responseData)) {
      if (targetKeys.includes(key)) {
        expandedData[key] = expandValue(initialObj[key], responseData[key]);
      } else {
        expandedData[key] = responseData[key];
      }
    }
    return expandedData as To;
  };

  return { reduceRequest, expandResponse };
};

export default transformAPI;
