<template>
  <div class="trainingPrograms-list">
    <table class="table">
      <thead class="head">
        <tr class="row">
          <th class="col">STT</th>
          <th class="col">Mã CTĐT</th>
          <th class="col">Tên CTĐT</th>
          <th class="col">Khóa</th>
          <th class="col">Ngành</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(trainingProgram, index) in trainingPrograms"
          :key="trainingProgram.id"
          class="row"
          @dblclick.prevent="openDialog(trainingProgram)"
        >
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ trainingProgram.code }}</td>
          <td class="cell">{{ trainingProgram.name }}</td>
          <td class="cell">{{ trainingProgram.academicYear?.name }}</td>
          <td class="cell">{{ trainingProgram.marjor?.name }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <trainingProgram-dialog
          :current-training-program="currentTrainingProgram"
          :academic-years="academicYears"
          :majors="majors"
          @closed="closeDialog"
          @submit="onSubmit"
          @delete="onDelete"
        ></trainingProgram-dialog>
      </app-dialog>
    </table>
  </div>
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
      const [academicYears, majors] = await Promise.all([fetchListAcademicYears(), fetchListMajors()]);
      this.academicYears = academicYears;
      this.majors = majors;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await trainingProgramsStore.$dispatch('updateTrainingPrograms', payload);
      await trainingProgramsStore.$dispatch('getListTrainingPrograms');
    },
    async onDelete(payload) {
      await trainingProgramsStore.$dispatch('deleteTrainingProgram', payload.id);
      await trainingProgramsStore.$dispatch('getListTrainingPrograms');
    },
  },
};
</script>
<style scoped lang="scss">
.trainingPrograms-list {
  height: 80vh;
  overflow-y: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
.trainingPrograms-list > .table > .head {
  color: var(--color-primary);
  font-size: 17px;
  line-height: 21px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  > .row {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  > .row > .col {
    padding: 10px 0px 10px 10px;
    // position: sticky;
    // top: 0;
    // z-index: 1;
    background-color: rgba($color: #3340bf, $alpha: 0.17);
    &:first-child {
      text-align: center;
    }
  }
}
.trainingPrograms-list > .table > .body > .row {
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  > .cell {
    padding: 13px 0px 13px 13px;
    &:first-child {
      text-align: center;
    }
  }
}
</style>
