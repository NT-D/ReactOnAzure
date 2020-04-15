import React, { FC, useState, useEffect, useRef } from 'react';
import './App.css';
import { PersonaPresence, IPersonaSharedProps, Persona, PersonaInitialsColor, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getMatchStatusAsync } from "./services/personStatusService";
import UserList from "./UserList/UserList";
import { User } from "./interfaces/User";


// Call API every 5 sec for
const refreshIntervalMillisecond: number = 5000;
type AppState = {
  isRefreshStop: boolean;
  isInitialized: boolean;
  users: User[];
};
const sampleItems: User[] = [
  { "id": "1", "text": "Sample Name 1",  "presence": PersonaPresence.online },
  { "id": "2", "text": "Sample Name 2", "presence": PersonaPresence.blocked }
];
/*
const examplePersona: IPersonaSharedProps = {
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
};

const personaWithInitials: IPersonaSharedProps = {
  ...examplePersona,
  text: 'Maor Sharett',
  imageInitials: 'SP',
};*/

const App: FC = () => {

  const [appState, setAppState] = useState<AppState>({
    isRefreshStop: false,
    isInitialized: false,
    users: [],
  });

  const refAppState = useRef(appState);

  useEffect(() => {
    refAppState.current = appState;
  }, [appState]);

  useEffect(() => {
    if (!appState.isInitialized) {
      refreshUserListasync();
    } else {
      const interval = setInterval(async () => {
        if (!refAppState.current.isRefreshStop) await refreshUserListasync();
      }, refreshIntervalMillisecond);
      return () => clearInterval(interval);
    }
  }, [appState.isRefreshStop, appState.isInitialized]);

  const refreshUserListasync = async () => {
    const appState = refAppState.current;
    try {
      const usersStatuses = await getMatchStatusAsync(appState.users);
      let newUserStatuses = mergeUserState(appState.users, usersStatuses);

      const newState = {
        ...appState,
        isInitialized: true,
        isRefreshStop: true,
        users: newUserStatuses
      };
      setAppState(newState);
    } catch (error) {
      console.log(error);     
    }
  }; 
   return (
    <div className="App">
            <span>Person List</span>
      <Stack >
      <UserList users={appState.users} />
      </Stack>
    </div>
  );
  
}

const mergeUserState = (
  existingStatuses: User[],
  newStatuses: User[]
): User[] => {
  if (existingStatuses && existingStatuses.length !== 0) {
    const mergedStatus = [...existingStatuses, ...newStatuses].reduce(
      (obj: { [key: string]: User }, it) => {
        if (obj[it.id]) {
          obj[it.id] = { ...obj[it.id], presence: it.presence };
        } else {
          obj[it.id] = it;
        }
        return obj;
      },
      {}
    );
    return Object.values(mergedStatus);
  } else {
    return newStatuses;
  }
};

export default App;
