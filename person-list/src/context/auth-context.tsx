// eslint-disable-next-line no-unused-vars
import React, { useState, ReactNode } from 'react';
export const AuthContext = React.createContext({
  isAuth: false,
  setLogin: () => {},
  setLogout: () => {},
});

interface Props {
  children: ReactNode;
}
const AuthContextProvider = (props: Props) => {
  const [isAuth, setIsAuth] = useState(false);

  const setLogin = () => {
    setIsAuth(true);
  };

  const setLogout = () => {
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth: isAuth, setLogin: setLogin, setLogout: setLogout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
