<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <faculty-dialog @closed="closeDialog" @submit="onSubmit"></faculty-dialog>
    </app-dialog>
  </div>
</template>
<script>
import FacultyDialog from '~/pages/faculties/-faculty-dialog';
import { pathified } from '~/utils';
const facultyStore = pathified('faculties');
export default {
  components: { FacultyDialog },
  data() {
    return {
      visibleDialog: false,
    };
  },
  methods: {
    openDialog() {
      this.visibleDialog = true;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await facultyStore.$dispatch('createFaculties', payload);
      await facultyStore.$dispatch('getListFaculties');
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
}
</style>
