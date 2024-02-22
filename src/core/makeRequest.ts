interface RequestOptions<T = any, S = any> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  onStart?: () => void;
  onEnd?: () => void;
  select?: (data: S) => T;
}

interface Result<T> {
  data: T | null;
  isSuccess: boolean;
  isError: boolean;
}

const makeRequest = async <T = any, S = any>(
  fetchFn: () => Promise<Response>,
  { onSuccess, onError, onStart, onEnd, select }: RequestOptions<T, S>
): Promise<Result<T>> => {
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
      data: null,
      isSuccess: false,
      isError: true,
    };
  } finally {
    onEnd && onEnd();
  }
};
