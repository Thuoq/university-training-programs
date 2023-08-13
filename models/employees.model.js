import { apis } from '~/apis';

export const fetchListEmployees = (q = '') => apis.universityAPI.get(`employees?${q}`).json();
export const createEmployee = (payload) =>
  apis.universityAPI
    .post('employees', {
      json: payload,
    })
    .json();

export const updateEmployee = (payload) =>
  apis.universityAPI
    .put(`employees/${payload.employeeCode}`, {
      json: {
        name: payload.name,
        email: payload.email,
        employeeCode: payload.employeeCode,
        password: payload.password,
        facultyId: payload.facultyId,
        positionIds: payload.positionIds,
        roleId: payload.roleId,
        sectionId: payload.sectionId,
      },
    })
    .json();

export const findEmployeeByEmployeeCode = (payload) => apis.universityAPI.get(`employees/${payload}`).json();
