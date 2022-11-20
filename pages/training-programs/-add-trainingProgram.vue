<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <trainingProgram-dialog
        :academicYears="academicYears"
        :majors="majors"
        @closed="closeDialog"
        @submit="onSubmit"
      ></trainingProgram-dialog>
    </app-dialog>
  </div>
</template>
<script>
import TrainingProgramDialog from '~/pages/training-programs/-trainingProgram-dialog';
import { fetchListMajors } from '~/models/majors.model';
import { fetchListAcademicYears } from '~/models/academicYears.model';
import { pathified } from '~/utils';
const trainingProgramStore = pathified('trainingPrograms');
export default {
  components: { TrainingProgramDialog },
  data() {
    return {
      visibleDialog: false,
      majors: [],
      academicYears: [],
    };
  },
  methods: {
    async openDialog() {
      this.visibleDialog = true;
      this.academicYears = await fetchListAcademicYears();
      this.majors = await fetchListMajors();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await trainingProgramStore.$dispatch('createTrainingPrograms', payload);
      await trainingProgramStore.$dispatch('getListTrainingPrograms');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-row {
  padding: 12px 48px 12px 25px;
  > .btn {
    width: 200px;
    height: 36px;
    background: #d3d8ea;
    //   border: 1px solid #000000;
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
</style>
