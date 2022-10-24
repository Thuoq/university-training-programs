import { apis } from '~/apis';

export const fetchListPositions = () => apis.universityAPI.get('positions').json();

export const createPosition = (payload) =>
  apis.universityAPI
    .post('positions', {
      json: payload,
    })
    .json();