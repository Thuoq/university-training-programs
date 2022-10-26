<template>
  <table class="employee-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã</th>
      <th class="col">Tên người dùng</th>
      <th class="col">Nhóm người dùng</th>
      <th class="col">Khoa</th>
      <th class="col">Email</th>
    </tr>
    <tr v-for="(employee, index) in employees" :key="employee.id" class="row" @dblclick.prevent="openDialog(employee)">
      <td class="cell">{{ index+1 }}</td>
      <td class="cell">{{ employee.employeeCode }}</td>
      <td class="cell">
        {{ employee.name }}
        <br />
        <p class="text">{{ employee.positionEmployees[0].position?.name }}</p>
      </td>
      <td class="cell">{{ employee.role.name }}</td>
      <td class="cell">{{ employee.faculty?.name }}</td>
      <td class="cell">{{ employee.email }}</td>
    </tr>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <employee-dialog
        :roles="roles"
        :faculties="faculties"
        :positions="positions"
        :isEdit="isEdit"
        :current-employee="currentEmployee"
        :sections="sections"
        @closed="closeDialog"
        @submit="onSubmit"
      ></employee-dialog>
    </app-dialog>
  </table>
</template>
<script>
import EmployeeDialog from './-employee-dialog.vue';
import { pathified } from '~/utils';
import { fetchListRoles } from '~/models/roles.model';
import { fetchListPositions } from '~/models/positions.model';
import { getListFaculties } from '~/models/faculties.model';
import { fetchListSections } from '~/models/sections.model';
const employeesStore = pathified('employees');
export default {
  components: {
    EmployeeDialog,
  },
  data() {
    return {
      visibleDialog: false,
      isEdit:true,
      currentEmployee: null,
      roles: null,
      faculties: null,
      positions: null,
      sections: null
    };
  },
  computed: {
    employees: employeesStore.$get('employees'),
  },
  async created() {
    this.roles = await fetchListRoles();
    this.faculties = await getListFaculties();
    this.positions = await fetchListPositions();
    this.sections = await fetchListSections();
    await employeesStore.$dispatch('getListEmployees');
  },
  methods: {
    openDialog(employee) {
      this.visibleDialog = true;
      this.currentEmployee = employee;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      // await employeesStore.$dispatch('updateEmployees', payload);
      // await employeesStore.$dispatch('getListEmployees');
    },
  },
};
</script>
<style scoped lang="scss">
.employee-list {
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
    font-size: 15px;
    font-family: 'Inter';
    padding: 13px 0px 13px 13px;
  }

  > .row > .cell > .text {
    font-size: 12px;
    font-family: 'Inter';
    color: #8c8c8c;
  }

  --mdc-dialog-min-width: 838px;
  --mdc-dialog-max-height: 800px;
  --mdc-shape-medium: 15px;
}
</style>
