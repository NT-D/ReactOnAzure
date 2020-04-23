import React, { FC, useState, useEffect, useRef } from 'react';
import './App.css';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { getMatchStatusAsync } from './services/personStatusService';
import UserList from './components/UserList/UserList';
import { User } from './interfaces/User';
import AuthLogIn from './components/Auth/AuthLogIn';
import AuthLogOut from './components/Auth/AuthLogOut';

type AppState = {
  isRefreshStop: boolean;
  users: User[];
};

const App: FC = () => {
  const [appState, setAppState] = useState<AppState>({
    isRefreshStop: false,
    users: [],
  });

  const [isLoggedIn, updateIsLoggedIn] = useState<boolean>(false);
  const updateLogin = (isLoggedIn: boolean): void => {
    updateIsLoggedIn(isLoggedIn);
  };

  const refAppState = useRef(appState);

  useEffect(() => {
    refAppState.current = appState;
  }, [appState]);

  useEffect(() => {
    if (!appState.isRefreshStop) {
      refreshUserListasync();
    }
  }, [appState.isRefreshStop]);

  const refreshUserListasync = async () => {
    const appState = refAppState.current;
    try {
      const usersStatuses = await getMatchStatusAsync();

      const newState = {
        ...appState,
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
      {isLoggedIn ? (
        <>
          <span>Person List</span>
          <Stack>
            <UserList users={appState.users} />
          </Stack>
          <AuthLogOut updateLogin={updateLogin} />
        </>
      ) : (
        <>
          <AuthLogIn updateLogin={updateLogin} />
        </>
      )}
    </div>
  );
};

export default App;
