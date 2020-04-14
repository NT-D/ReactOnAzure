import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import classes from './Auth.module.css';
import * as Msal from 'msal';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    authority: process.env.REACT_APP_CALL_AUTHORITY || '',
    validateAuthority: false,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  },
};

const Auth = () => {
  const { setLogin, setLogout } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setErorr] = useState('');

  const login = () => {
    setLoading(true);
    return new Msal.UserAgentApplication(msalConfig)
      .loginPopup()
      .then((response: any) => {
        setLogin();
        localStorage.setItem('token', response.idToken);
      })
      .catch((err: any) => {
        setErorr(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = async () => {
    setLoading(true);
    new Msal.UserAgentApplication(msalConfig).logout();
    setLoading(false);
    localStorage.removeItem('token');
    setLogout();
  };

  let spinner = null;
  if (isLoading) {
    spinner = <Spinner />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error}</p>;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      {spinner}
      <Button clicked={login}>Login</Button>
      <Button clicked={logout}>Logout</Button>
    </div>
  );
};

export default Auth;
