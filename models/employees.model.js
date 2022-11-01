import { apis } from '~/apis';

export const fetchListEmployees = () => apis.universityAPI.get('employees').json();
export const createEmployee = (payload) =>
  apis.universityAPI
    .post('employees', {
      json: payload,
    })
    .json();

    // export const findEmployeeByEmployeeCode = (payload) =>
    // apis.universityAPI
    //   .get(`employees/${payload.}`)
    //   .json();

