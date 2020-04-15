export default class InvalidArgumentError implements Error {
  name: string;

  message: string;

  constructor(errMessage: string) {
    this.name = "InvalidArgumentError";
    this.message = errMessage;
  }
}
