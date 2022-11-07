import { apis } from '~/apis';
export const fetchListTrainingPrograms = () => apis.universityAPI.get('training-programs').json();
export const createTrainingProgram = (payload) =>
  apis.universityAPI
    .post('training-programs', {
      json: payload,
    })
    .json();

export const updateTrainingProgram = (payload) =>
  apis.universityAPI
    .put(`training-programs/${payload.id}`, {
      json: {
        name: payload.name,
        marjorId: payload.marjorId,
        academicYearId: payload.academicYearId,
      },
    })
    .json();
