import { fetchPersonStatus, HttpMethod } from "./HttpService";
import { PersonaPresence } from "office-ui-fabric-react/lib/Persona";
import { User } from '../interfaces/User';

const apiEndpoint: string = "http://localhost:7071/api/people";

interface UserPresence {
  displayName: string;
  availability: string;
}


export const getMatchStatusAsync = async (
  users?: User[]
): Promise<User[]> => {
  const result = await fetchPersonStatus<UserPresence[]>(
    apiEndpoint,
    HttpMethod.Get
  );

  return result
    .map(userPresense => {
      return {
        id: '1',
        text: userPresense.displayName,
        presence: convertAvailabilityForWebView(userPresense.availability),
      };
    });
};

const convertAvailabilityForWebView = (
  type: string
): PersonaPresence => {
  switch (type) {
    case 'Available':
      return PersonaPresence.online;
    case 'Busy':
    default:
      return PersonaPresence.blocked;
  }
};
