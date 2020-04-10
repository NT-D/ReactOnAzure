import { httpTrigger } from '.';
import { User } from './user';
import { Context, HttpRequest } from '@azure/functions';
import { mock } from 'jest-mock-extended';

describe(`${httpTrigger} tests`, () => {
  test('Correct input returns 200 OK response', async () => {
    // Arrange
    const mockContext = mock<Context>();
    const mockReq = mock<HttpRequest>();

    // Act
    await httpTrigger(mockContext, mockReq);

    // Assert
    expect(mockContext.res.status).toBe(200);
    expect((mockContext.res.body as User[]).length > 0).toBeTruthy;
  });
});
