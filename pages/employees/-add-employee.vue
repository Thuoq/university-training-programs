<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <employee-dialog
        :roles="roles"
        :faculties="faculties"
        :positions="positions"
        :sections="sections"
        :employees="employees"
        @closed="closeDialog"
        @submit="onSubmit"
      ></employee-dialog>
    </app-dialog>
  </div>
</template>
<script>
import EmployeeDialog from './-employee-dialog';
import { fetchListRoles } from '~/models/roles.model';
import { fetchListPositions } from '~/models/positions.model';
import { getListFaculties } from '~/models/faculties.model';
import { fetchListSections } from '~/models/sections.model';
import { fetchListEmployees } from '~/models/employees.model';
import { pathified } from '~/utils';
const employeeStore = pathified('employees');
export default {
  components: {
    EmployeeDialog,
  },
  data() {
    return {
      visibleDialog: false,
      roles: null,
      faculties: null,
      positions: null,
      sections: null,
      employees: null,
    };
  },
  async created() {
    this.roles = await fetchListRoles();
    this.faculties = await getListFaculties();
    this.positions = await fetchListPositions();
    this.sections = await fetchListSections();
  },
  methods: {
    async openDialog() {
      this.visibleDialog = true;
      this.employees = await fetchListEmployees();
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
  margin-top: 40px;
  margin-bottom: 54px;
  > .btn {
    width: 200px;
    height: 36px;
    background: #d3d8ea;
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-dialog-min-width: 838px;
  --mdc-dialog-max-height: 800px;
}
</style>
