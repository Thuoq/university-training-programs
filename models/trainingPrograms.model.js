import { apis } from '~/apis';
export const fetchListTrainingPrograms = (q = '') => apis.universityAPI.get(`training-programs?${q}`).json();
export const createTrainingProgram = (payload) =>
  apis.universityAPI
    .post('training-programs', {
      json: payload,
    })
    .json();

export const createTrainingProgramContent = (payload) =>
  apis.universityAPI
    .post('training-program-contents/many', {
      json: payload,
    })
    .json();

// TP === Training Program
export const deleteTrainingProgramContentByTPId = (trainingProgramId) =>
  apis.universityAPI.delete(`training-program-contents/${trainingProgramId}`);

export const updateTrainingProgram = (payload) =>
  apis.universityAPI
    .put(`training-programs/${payload.id}`, {
      json: {
        code: payload.code,
        name: payload.name,
        marjorId: payload.marjorId,
        academicYearId: payload.academicYearId,
      },
    })
    .json();

export const deleteTrainingProgram = (id) => apis.universityAPI.delete(`training-programs/${id}`).json();
