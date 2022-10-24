import { apis } from '~/apis';
export const fetchListAcademicYears = () => apis.universityAPI.get('academic-year').json();
export const createAcademicYear = (payload) =>
  apis.universityAPI
    .post('academic-years', {
      json: payload,
    })
    .json();