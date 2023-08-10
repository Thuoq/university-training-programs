import { apis } from '~/apis';
export const fetchListAcademicYears = (q = '') => apis.universityAPI.get(`academic-year?${q}`).json();
export const createAcademicYear = (payload) =>
  apis.universityAPI
    .post('academic-year', {
      json: payload,
    })
    .json();

export const updateAcademicYear = (payload) =>
  apis.universityAPI
    .put(`academic-year/${payload.id}`, {
      json: {
        code: payload.code,
        name: payload.name,
        startYear: payload.startYear,
        finishYear: payload.finishYear,
      },
    })
    .json();

export const deleteAcademicYearById = (payload) => apis.universityAPI.delete(`academic-year/${payload.id}`).json();
