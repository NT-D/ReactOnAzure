import React, { FC, useState, useEffect, useRef } from 'react';
import './App.css';
import { PersonaPresence } from 'office-ui-fabric-react/lib/Persona';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getMatchStatusAsync } from './services/personStatusService';
import UserList from './components/UserList';
import { User } from './interfaces/User';
import Auth from './components/Auth/Auth';

// Call API every 5 sec for
const refreshIntervalMillisecond: number = 10000;
type AppState = {
  isRefreshStop: boolean;
  isInitialized: boolean;
  users: User[];
};
const sampleItems: User[] = [
  { id: '1', text: 'Sample Name 1', presence: PersonaPresence.online, gender: 'female' },
  { id: '2', text: 'Sample Name 2', presence: PersonaPresence.blocked, gender: 'male' },
];

const App: FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isRefreshStop: false,
    isInitialized: false,
    users: sampleItems,
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
      const usersStatuses = await getMatchStatusAsync();

      const newState = {
        ...appState,
        isInitialized: true,
        isRefreshStop: true,
        users: usersStatuses,
      };
      setAppState(newState);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <Auth />
      <span>Person List</span>
      <Stack data-testid="person-list-stack">
        <UserList users={appState.users} />
      </Stack>
    </div>
  );
};

export default App;
