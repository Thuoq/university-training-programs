<template>
  <div class="faculties-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã Khoa</th>
          <th class="col">Tên Khoa</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(faculty, index) in faculties" :key="faculty.id" class="row" @dblclick.prevent="openDialog(faculty)">
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ faculty.code }}</td>
          <td class="cell">{{ faculty.name }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <faculty-dialog
          :is-edit="isEdit"
          :current-faculty="currentFaculty"
          @closed="closeDialog"
          @submit="onSubmit"
          @delete="onDelete"
        ></faculty-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import FacultyDialog from '~/pages/faculties/-faculty-dialog';
import { pathified } from '~/utils';
const facultiesStore = pathified('faculties');
export default {
  components: { FacultyDialog },
  data() {
    return {
      isEdit: true,
      visibleDialog: false,
      currentFaculty: null,
    };
  },
  computed: {
    faculties: facultiesStore.$get('faculties'),
  },
  async created() {
    await facultiesStore.$dispatch('getListFaculties');
  },
  methods: {
    openDialog(faculty) {
      this.visibleDialog = true;
      this.currentFaculty = faculty;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await facultiesStore.$dispatch('updateFaculties', payload);
      await facultiesStore.$dispatch('getListFaculties');
    },
    async onDelete(payload) {
      await facultiesStore.$dispatch('deleteFaculty', payload);
      await facultiesStore.$dispatch('getListFaculties');
    },
  },
};
</script>
<style scoped lang="scss">
.faculties-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
}
.faculties-list > .table > .head {
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
.faculties-list > .table > .body > .row {
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
