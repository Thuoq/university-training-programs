import { apis } from '~/apis';
export const fetchListAcademicYears = () => apis.universityAPI.get('academic-year').json();
export const fetchSearchListAcademicYears = (payload) =>
  apis.universityAPI.get(`academic-year?textSearch=${payload}`).json();
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
