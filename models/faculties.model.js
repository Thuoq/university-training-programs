import { apis } from '~/apis';
export const fetchListFaculties = () => apis.universityAPI.get('faculties').json();
export const createFaculty = (payload) =>
  apis.universityAPI
    .post('faculties', {
      json: payload,
    })
    .json();
