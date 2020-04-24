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

const AuthLogOut: FC<AuthProps> = (props) => {
  const { setLogout } = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    new Msal.UserAgentApplication(msalConfig).logout();
    setLoading(false);
    localStorage.removeItem('token');
    setLogout();
    props.updateLogin(false);
  };

  if (isLoading) {
    return <Spinner label="Wait, wait..." ariaLive="assertive" labelPosition="right" />;
  } else {
    return (
      <div className={classes.Auth}>
        <p>Click to leave Azure AD B2C</p>
        <DefaultButton onClick={logout}>Logout</DefaultButton>
      </div>
    );
  }
};

export default AuthLogOut;
