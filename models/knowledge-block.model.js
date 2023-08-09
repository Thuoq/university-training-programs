import { apis } from '~/apis';
export const fetchListKnowledgeBlock = () => apis.universityAPI.get('knowledge-block').json();
export const fetchSearchListKnowledgeBlock = (payload) =>
  apis.universityAPI.get(`knowledge-block?textSearch=${payload}`).json();
export const createKnowledgeBlock = (payload) =>
  apis.universityAPI
    .post('knowledge-block', {
      json: payload,
    })
    .json();

export const updateKnowledgeBlock = (payload) =>
  apis.universityAPI
    .put(`knowledge-block/${payload.id}`, {
      json: {
        name: payload.name,
        code: payload.code,
        knowledgeParentId: !payload.knowledgeParentId ? null : payload.knowledgeParentId,
      },
    })
    .json();
