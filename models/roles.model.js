import { apis } from '~/apis';

export const fetchListRoles = () => apis.universityAPI.get('roles').json();
export const createRole = (payload) =>
  apis.universityAPI
    .post('roles', {
      json: payload,
    })
    .json();
