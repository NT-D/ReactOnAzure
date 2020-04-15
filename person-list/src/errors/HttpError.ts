export default class HttpError implements Error {
  name = "HttpError";
  statusCode: number;
  message: string;

  constructor(statusCode: number, errorMessage: string) {
    this.statusCode = statusCode;
    this.message = errorMessage;
  }
}
