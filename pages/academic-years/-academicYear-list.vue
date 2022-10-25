<template>
  <table class="academicYears-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã Khóa</th>
      <th class="col">Tên Khóa</th>
      <th class="col">Năm học</th>
    </tr>
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
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <academicYear-dialog
        :isEdit="isEdit"
        :currentAcademicYear="currentAcademicYear"
        @closed="closeDialog"
        @submit="onSubmit"
      ></academicYear-dialog>
    </app-dialog>
  </table>
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
      isEdit: true,
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
  },
};
</script>
<style scoped lang="scss">
.academicYears-list {
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
}
</style>
