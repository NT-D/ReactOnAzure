import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { User, availability } from './user';

export const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.res = {
    status: 200,
    body: createDummyBody(),
  };
};

const createDummyBody = (): User[] => {
  return [
    { id: '1', displayName: 'Sinny Pan', presence: createDummyPresence() },
    { id: '2', displayName: 'Masayuki Ota', presence: createDummyPresence() },
  ];
};

const createDummyPresence = (): availability => {
  const randomNumber: number = Math.floor(Math.random() * 10 + 1);
  if (randomNumber % 2 === 0) return availability.available;

  return availability.busy;
};
