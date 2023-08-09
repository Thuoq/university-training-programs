import { apis } from '~/apis';

export const fetchListSubjects = () => apis.universityAPI.get('subjects').json();
export const fetchSearchListSubjects = (payload) => apis.universityAPI.get(`subjects?textSearch=${payload}`).json();

export const createSubject = (payload) =>
  apis.universityAPI
    .post('subjects', {
      json: payload,
    })
    .json();

export const updateSubject = (payload) =>
  apis.universityAPI
    .put(`subjects/${payload.id}`, {
      json: {
        name: payload.name,
        numberOfCredits: payload.numberOfCredits,
        numberPrerequisiteCredits: payload.numberPrerequisiteCredits,
        numberOfTeachingHours: payload.numberOfTeachingHours,
        code: payload.code,
        coefficient: payload.coefficient,
        prerequisiteSubjectsId: payload.prerequisiteSubjectsId,
      },
    })
    .json();
