import { apis } from '~/apis';
export const signIn = (credentials) => {
  return apis.universityAPI
    .post(`auth/signIn`, {
      json: credentials,
    })
    .json();
};

export const resetPass = (pass) => {
  return apis.universityAPI
    .patch(`auth/reset-password`, {
      json: pass,
    })
    .json();
};

export const logOut= () => {
  return apis.universityAPI
    .post(`auth/log-out`)
    .json();
};
