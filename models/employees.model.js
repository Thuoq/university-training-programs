import { apis } from '~/apis';

export const fetchListEmployees = () => apis.universityAPI.get('employees').json();
export const createEmployee = (payload) =>
  apis.universityAPI
    .post('employees', {
      json: payload,
    })
    .json();

export const updateEmployee = (payload) =>
  apis.universityAPI
    .put(`employees/${payload.id}`, {
      json: {
        name: payload.name,
        email: payload.email,
        employeeCode: payload.employeeCode,
        // password: payload.password,
        facultyId: payload.facultyId,
        positionId: payload.positionId,
        roleId: payload.roleId,
        sectionId: payload.sectionId,
      },
    })
    .json();

export const findEmployeeByEmployeeCode = (payload) => apis.universityAPI.get(`employees/${payload}`).json();
