import { apis } from '~/apis';

export const fetchListSections = () => apis.universityAPI.get('sections').json();

export const createSection = (payload) =>
  apis.universityAPI
    .post('sections', {
      json: payload,
    })
    .json();

export const updateSection = (payload) =>
  apis.universityAPI
    .put(`sections/${payload.id}`, {
      json: {
        code: payload.code,
        name: payload.name,
        facultyId: payload.facultyId
      },
    })
    .json();