interface RequestOptions<ReturnType = any, DataType = any> {
  onSuccess?: (data: ReturnType) => void;
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

const makeRequest = async <ReturnType = any, DataType = any>(
  fetchFn: () => Promise<Response>,
  requestOptions?: RequestOptions<ReturnType, DataType>
): Promise<Result<ReturnType>> => {
  const { onSuccess, onError, onStart, onEnd, select } =
    requestOptions ?? {};
  if (onStart) onStart();

  try {
    const response = await fetchFn();
    if (!response.ok) {
      throw new Error(
        `API Error ${response.status} : ${response.statusText}`
      );
    }
    let data = await response.json();
    if (select) data = select(data);
    if (onSuccess) onSuccess(data);
    return {
      data,
      isSuccess: true,
      isError: false,
    };
  } catch (error: any) {
    if (onError) onError(error);
    return {
      data: undefined,
      isSuccess: false,
      isError: true,
    };
  } finally {
    onEnd && onEnd();
  }
};

export default makeRequest;
