import { apis } from '~/apis';

export const fetchListPositions = () => apis.universityAPI.get('positions').json();

export const createPosition = (payload) =>
  apis.universityAPI
    .post('positions', {
      json: payload,
    })
    .json();

export const updatePosition = (payload) =>
  apis.universityAPI
    .put(`positions/${payload.id}`, {
      json: {
        name: payload.name,
        code: payload.code,
      },
    })
    .json();

export const deletePositionById = (payload) => apis.universityAPI.delete(`positions/${payload.id}`).json();
