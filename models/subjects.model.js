import { apis } from '~/apis';

export const fetchListSubjects = () => apis.universityAPI.get('subjects').json();

export const createSubject = (payload) =>
  apis.universityAPI
    .post('subjects', {
      json: payload,
    })
    .json();
