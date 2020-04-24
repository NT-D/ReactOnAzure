export const msalConfig = {
  auth: {
    clientId: process.env.REACT_APP_CLIENT_ID || '',
    authority: process.env.REACT_APP_CALL_AUTHORITY || '',
    validateAuthority: false,
    redirectUri: process.env.REACT_APP_REDIRECT_URI || '',
  },
};
