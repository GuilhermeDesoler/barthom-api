import { HttpStatusCode, IHttpResponse } from "./protocols";

export const ok = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body: body,
});

export const created = <T>(body: any): IHttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body: body,
});

export const badRequest = (message: string): IHttpResponse<string> => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: message,
});

export const serverError = (): IHttpResponse<string> => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: "Internal server error.",
});
