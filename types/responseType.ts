export type ResponseApi<T> = {
  status: number;
  message: string;
  data: T;
};
