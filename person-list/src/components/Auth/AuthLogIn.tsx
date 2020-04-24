import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import classes from './Auth.module.css';
import * as Msal from 'msal';
import { msalConfig } from '../../setup';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

type AuthProps = {
  updateLogin: (isLogin: boolean) => void;
};

const AuthLogIn: FC<AuthProps> = (props) => {
  const { setLogin } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const [error, setErorr] = useState('');

  const login = () => {
    setLoading(true);
    return new Msal.UserAgentApplication(msalConfig)
      .loginPopup()
      .then((response: any) => {
        setLogin();
        localStorage.setItem('token', response.idToken);
        props.updateLogin(true);
      })
      .catch((err: any) => {
        setErorr(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  let spinner = null;
  if (isLoading) {
    spinner = <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" />;
  }

  let errorMessage = null;
  if (error) {
    errorMessage = <p>{error}</p>;
  }

  return (
    <div className={classes.Auth}>
      {errorMessage}
      {spinner}
      <p>Please Login using Azure AD B2C</p>
      <DefaultButton onClick={login}>Login</DefaultButton>
    </div>
  );
};

export default AuthLogIn;
