import { apis } from '~/apis';

export const fetchListEmployees = () => apis.universityAPI.get('employees').json();
// export const createRole = (payload) =>
//   apis.universityAPI
//     .post('roles', {
//       json: payload,
//     })
//     .json();