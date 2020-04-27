export class InvalidTokenError implements Error {
  name: string;
  message: string;
  type: InvalidTokenType;

  constructor(errMessage: string, type: InvalidTokenType) {
    this.name = 'InvalidTokenError';
    this.message = errMessage;
    this.type = type;
  }
}

export enum InvalidTokenType {
  TokenIsNull,
  TokenExpired,
  Invalid,
}
