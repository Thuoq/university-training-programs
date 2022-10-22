import { apis } from '~/apis';

export const fetchListSections = () => apis.universityAPI.get('sections').json();

export const createSection = (payload) =>
  apis.universityAPI
    .post('sections', {
      json: payload,
    })
    .json();
