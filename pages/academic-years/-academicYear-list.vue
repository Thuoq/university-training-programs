<template>
  <div class="academicYears-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã Khóa</th>
          <th class="col">Tên Khóa</th>
          <th class="col">Năm học</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(academicYear, index) in academicYears"
          :key="academicYear.id"
          class="row"
          @dblclick.prevent="openDialog(academicYear)"
        >
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ academicYear.code }}</td>
          <td class="cell">{{ academicYear.name }}</td>
          <td class="cell">{{ getYear(academicYear.startYear) }} - {{ getYear(academicYear.finishYear) }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <academicYear-dialog
          :current-academic-year="currentAcademicYear"
          @closed="closeDialog"
          @submit="onSubmit"
          @delete="onDelete"
        ></academicYear-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import AcademicYearDialog from '~/pages/academic-years/-academicYear-dialog';
import { pathified } from '~/utils';
const academicYearsStore = pathified('academicYears');
export default {
  components: { AcademicYearDialog },
  data() {
    return {
      visibleDialog: false,
      currentAcademicYear: null,
    };
  },
  computed: {
    academicYears: academicYearsStore.$get('academicYears'),
  },
  async created() {
    await academicYearsStore.$dispatch('getListAcademicYears');
  },
  methods: {
    getYear(data) {
      return new Date(data).getFullYear();
    },
    openDialog(academicYear) {
      this.visibleDialog = true;
      this.currentAcademicYear = academicYear;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await academicYearsStore.$dispatch('updateAcademicYears', payload);
      await academicYearsStore.$dispatch('getListAcademicYears');
    },
    async onDelete(payload) {
      await academicYearsStore.$dispatch('deleteAcademicYear', payload);
      await academicYearsStore.$dispatch('getListAcademicYears');
    },
  },
};
</script>
<style scoped lang="scss">
.academicYears-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 550px;
}
.academicYears-list > .table > .head {
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
.academicYears-list > .table > .body > .row {
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
