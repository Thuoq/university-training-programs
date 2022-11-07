<template>
  <table class="trainingPrograms-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã CTĐT</th>
      <th class="col">Tên CTĐT</th>
      <th class="col">Khóa</th>
      <th class="col">Ngành</th>
    </tr>
    <tr
      v-for="(trainingProgram, index) in trainingPrograms"
      :key="trainingProgram.id"
      class="row"
      @dblclick.prevent="openDialog(trainingProgram)"
    >
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ trainingProgram.id }}</td>
      <td class="cell">{{ trainingProgram.name }}</td>
      <td class="cell">{{ trainingProgram.academicYearId }}</td>
      <td class="cell">{{ trainingProgram.marjorId }}</td>
    </tr>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <trainingProgram-dialog
        :isEdit="isEdit"
        :currentTrainingProgram="currentTrainingProgram"
        :academicYears="academicYears"
        :majors="majors"
        @closed="closeDialog"
        @submit="onSubmit"
      ></trainingProgram-dialog>
    </app-dialog>
  </table>
</template>
<script>
import TrainingProgramDialog from '~/pages/training-programs/-trainingProgram-dialog';
import { fetchListMajors } from '~/models/majors.model';
import { fetchListAcademicYears } from '~/models/academicYears.model';
import { pathified } from '~/utils';
const trainingProgramsStore = pathified('trainingPrograms');
export default {
  components: { TrainingProgramDialog },
  data() {
    return {
      visibleDialog: false,
      isEdit: true,
      currentTrainingProgram: null,
      academicYears: [],
      majors: [],

    };
  },
  computed: {
    trainingPrograms: trainingProgramsStore.$get('trainingPrograms'),
  },
  async created() {
    await trainingProgramsStore.$dispatch('getListTrainingPrograms');
  },
  methods: {
    async openDialog(trainingProgram) {
      this.visibleDialog = true;
      this.currentTrainingProgram = trainingProgram;
      this.academicYears = await fetchListAcademicYears();
      this.majors = await fetchListMajors();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await trainingProgramsStore.$dispatch('updateTrainingPrograms', payload);
      await trainingProgramsStore.$dispatch('getListTrainingPrograms');
    },
  },
};
</script>
<style scoped lang="scss">
.trainingPrograms-list {
  border-collapse: collapse;
  padding: 12px 48px 12px 25px;
  font-size: 16px;
  width: 100%;
  > .row {
    border: 1px solid rgba(0, 0, 0, 0.15);
    &.-head {
      color: var(--color-primary);
      font-size: 17px;
      line-height: 21px;
      font-weight: 700;
      text-align: left;
      background-color: rgba($color: #3340bf, $alpha: 0.17);
    }
  }
  > .row > .col {
    padding: 10px 0px 10px 10px;
  }
  > .row .col:first-child {
    text-align: center;
  }
  > .row > .cell:first-child {
    text-align: center;
  }
  > .row > .cell {
    padding: 13px 0px 13px 13px;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
</style>
