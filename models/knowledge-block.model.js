import { apis } from '~/apis';
export const fetchListKnowledgeBlock = () => apis.universityAPI.get('knowledge-block').json();
export const createKnowledgeBlock = (payload) =>
  apis.universityAPI
    .post('knowledge-block', {
      json: payload,
    })
    .json();
