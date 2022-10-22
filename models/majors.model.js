import { apis } from '~/apis';
export const fetchListMajors = () => apis.universityAPI.get('majors').json();
export const createMajor = (payload) =>
  apis.universityAPI
    .post('majors', {
      json: payload,
    })
    .json();