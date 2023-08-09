import { apis } from '~/apis';
export const getListFaculties = () => apis.universityAPI.get('faculties').json();
export const fetchListFaculties = () => apis.universityAPI.get('faculties').json();

export const fetchSearchListFaculties = (payload) => apis.universityAPI.get(`faculties?textSearch=${payload}`).json();

export const createFaculty = (payload) =>
  apis.universityAPI
    .post('faculties', {
      json: payload,
    })
    .json();

export const updateFaculty = (payload) =>
  apis.universityAPI
    .put(`faculties/${payload.id}`, {
      json: {
        code: payload.code,
        name: payload.name,
      },
    })
    .json();

export const deleteFacultyById = (payload) => apis.universityAPI.delete(`faculties/${payload.id}`).json();
