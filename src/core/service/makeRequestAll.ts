interface RequestOptions<ReturnType, DataType> {
  onSuccess?: (datas: ReturnType) => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onEnd?: () => void;
  select?: (data: DataType) => ReturnType;
}

interface Result<ReturnType> {
  data: ReturnType | undefined;
  isSuccess: boolean;
  isError: boolean;
}

const makeRequestAll = async <ReturnType = any, DataType = any>(
  fetchFns: (() => Promise<Response>)[],
  requestOptions?: RequestOptions<ReturnType, DataType>
): Promise<Result<ReturnType>> => {
  const { onSuccess, onError, onStart, onEnd, select } = requestOptions ?? {};
  if (onStart) onStart();

  try {
    const responses = await Promise.all(fetchFns.map((fetchFn) => fetchFn()));
    const datas = await Promise.all(
      responses.map((response) => {
        if (!response.ok) {
          throw new Error(
            `API Error ${response.status} : ${response.statusText}`
          );
        }
        return response.json();
      })
    );

    const resultData = select ? select(datas as DataType) : datas;
    if (onSuccess) onSuccess(resultData as ReturnType);
    return { data: resultData as ReturnType, isSuccess: true, isError: false };
  } catch (error: any) {
    if (onError) onError(error);
    return { data: undefined, isSuccess: false, isError: true };
  } finally {
    onEnd && onEnd();
  }
};

export default makeRequestAll;
