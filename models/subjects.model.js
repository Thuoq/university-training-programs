import { apis } from '~/apis';

export const fetchListSubjects = (q = '') => apis.universityAPI.get(`subjects?${q}`).json();

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

export const deleteSubjectById = (payload) => apis.universityAPI.delete(`subjects/${payload.id}`).json();
