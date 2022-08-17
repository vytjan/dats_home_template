export type SuccessfulResponse<T> = {
  data: T;
  error?: never;
  status?: number;
};
export type UnsuccessfulResponse<E> = {
  data?: never;
  error: E;
  status?: number;
};

export type ApiResponse<T, E = unknown> =
  | SuccessfulResponse<T>
  | UnsuccessfulResponse<E>;
