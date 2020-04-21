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
    { id: '1', displayName: 'Princess Leia', presence: createDummyPresence(), gender: 'female' },
    { id: '2', displayName: 'Luke Skywalker', presence: createDummyPresence(), gender: 'male' },
    { id: '3', displayName: 'Han Solo', presence: createDummyPresence(), gender: 'male' },
  ];
};

const createDummyPresence = (): availability => {
  const randomNumber: number = Math.floor(Math.random() * 10 + 1);
  switch (randomNumber % 3) {
    case 0:
      return availability.available;
    case 1:
      return availability.busy;
    case 2:
    default:
      return availability.away;
  }
};
