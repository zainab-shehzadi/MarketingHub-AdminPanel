import { AxiosError, AxiosResponse } from 'axios';

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export async function apiCall<T>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> {
  try {
    const response = await request();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      axiosError.message ||
      'Something went wrong';

    throw new Error(message);
  }
}