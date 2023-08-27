export interface IHttpResponse<T> {
  statusCode: number;
  body: T | string;
}

export interface IHttpRequest<B> {
  params?: unknown;
  header?: unknown;
  body?: B;
}
