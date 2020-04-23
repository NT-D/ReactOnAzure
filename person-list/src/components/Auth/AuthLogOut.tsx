import React, { FC, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth-context';
import classes from './Auth.module.css';
import * as Msal from 'msal';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    authority: process.env.REACT_APP_CALL_AUTHORITY || '',
    validateAuthority: false,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  },
};

type AuthProps = {
  updateLogin: (isLogin: boolean) => void;
};

const AuthLogOut: FC<AuthProps> = (props) => {
  const { setLogout } = useContext(AuthContext);
  const setToken = useState('')[1];
  const [isLoading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    new Msal.UserAgentApplication(msalConfig).logout();
    setLoading(false);
    localStorage.removeItem('token');
    setLogout();
    setToken('');
    props.updateLogin(false);
  };

  let spinner = null;
  if (isLoading) {
    spinner = <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" />;
  }

  return (
    <div className={classes.Auth}>
      {spinner}
      <p>Click to leave Azure AD B2C</p>
      <DefaultButton onClick={logout}>Logout</DefaultButton>
    </div>
  );
};

export default AuthLogOut;
