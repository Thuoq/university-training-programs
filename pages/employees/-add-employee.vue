<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <employee-dialog @closed="closeDialog" @submit="onSubmit"></employee-dialog>
    </app-dialog>
  </div>
</template>
<script>
import EmployeeDialog from './-employee-dialog';
import { pathified } from '~/utils';
const employeeStore = pathified('employees');
export default {
  components: {
    EmployeeDialog,
  },
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
      await employeeStore.$dispatch('createEmployees', payload);
      await employeeStore.$dispatch('getListEmployees');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-row {
  padding: 12px 48px 12px 25px;
  text-align: right;
  margin-top: 30px;
  margin-bottom: 40px;
  > .btn {
    width: 200px;
    height: 36px;
    background: #d3d8ea;
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-dialog-min-width: 900px;
  --mdc-dialog-max-height: 800px;
  --mdc-shape-medium: 15px;
}
</style>
