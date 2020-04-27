import { fetchPersonStatus, HttpMethod } from './HttpService';
import { PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { User } from '../interfaces/User';
import { getIdToken } from './tokenService';

const apiEndpoint: string = process.env.REACT_APP_BACKEND_URL ?? '/api/people';

interface UserPresence {
  id: string;
  displayName: string;
  presence: string;
  gender: string;
}

export const getMatchStatusAsync = async (): Promise<User[]> => {
  const idToken = getIdToken();
  const result = await fetchPersonStatus<UserPresence[]>(apiEndpoint, HttpMethod.Get, idToken);

  return result.map((userPresense) => {
    return {
      id: userPresense.id,
      text: userPresense.displayName,
      presence: convertAvailabilityForWebView(userPresense.presence),
      gender: userPresense.gender,
    };
  });
};

const convertAvailabilityForWebView = (type: string): PersonaPresence => {
  switch (type) {
    case 'available':
      return PersonaPresence.online;
    case 'away':
      return PersonaPresence.away;
    case 'busy':
    default:
      return PersonaPresence.blocked;
  }
};
