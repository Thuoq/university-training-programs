import { apis } from '~/apis';
export const signIn = (credentials) => {
  return apis.universityAPI
    .post(`auth/signIn`, {
      json: credentials,
    })
    .json();
};
