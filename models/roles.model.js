import { apis } from '~/apis';

export const fetchListRoles = (q = '') => apis.universityAPI.get(`roles?${q}`).json();
export const createRole = (payload) =>
  apis.universityAPI
    .post('roles', {
      json: payload,
    })
    .json();
