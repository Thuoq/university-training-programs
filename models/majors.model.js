import { apis } from '~/apis';
export const fetchListMajors = (q = '') => apis.universityAPI.get(`majors?${q}`).json();
export const createMajor = (payload) =>
  apis.universityAPI
    .post('majors', {
      json: payload,
    })
    .json();

export const updateMajor = (payload) =>
  apis.universityAPI
    .put(`majors/${payload.id}`, {
      json: {
        name: payload.name,
        code: payload.code,
        facultyId: payload.facultyId,
        sectionId: payload.sectionId,
      },
    })
    .json();

export const deleteMajorById = (payload) => apis.universityAPI.delete(`majors/${payload.id}`).json();
