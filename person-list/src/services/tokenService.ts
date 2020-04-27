import { InvalidTokenError, InvalidTokenType } from '../errors/InvalidTokenError';
import { decode } from 'jsonwebtoken';

export const getIdToken = (): string => {
  const idToken: string | null = sessionStorage.getItem('token');
  if (idToken) {
    if (isTokenNotExpired(idToken)) {
      return idToken;
    } else {
      throw new InvalidTokenError('Token is expired', InvalidTokenType.TokenExpired);
    }
  } else {
    throw new InvalidTokenError('Token is not stored', InvalidTokenType.TokenIsNull);
  }
};
const isTokenNotExpired = (sonyIdToken: string): boolean => {
  try {
    const jwtToken: any = decode(sonyIdToken);
    return getUnixEpocSeconds() < jwtToken.exp;
  } catch (error) {
    throw new InvalidTokenError('Invalid jwt token', InvalidTokenType.Invalid);
  }
};
const getUnixEpocSeconds = (): number => {
  return Math.round(Date.now() / 1000);
};
