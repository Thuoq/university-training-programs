<template>
  <div class="employee-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã</th>
          <th class="col">Tên người dùng</th>
          <th class="col">Nhóm quyền</th>
          <th class="col">Khoa</th>
          <th class="col">Bộ môn</th>
          <th class="col">Email</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(employee, index) in employees"
          :key="employee.id"
          class="row"
          @dblclick.prevent="openDialog(employee)"
        >
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ employee.employeeCode }}</td>
          <td class="cell">
            {{ employee.name }}
            <br />
            <p class="text">{{ employee.positionEmployees[0]?.position?.name }}</p>
          </td>
          <td class="cell">{{ employee.role.name }}</td>
          <td class="cell">{{ employee.faculty?.name }}</td>
          <td class="cell">{{ employee.section?.name }}</td>
          <td class="cell">{{ employee.email }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <employee-dialog :current-employee="currentEmployee" @closed="closeDialog" @submit="onSubmit"></employee-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import EmployeeDialog from './-employee-dialog.vue';
import { pathified } from '~/utils';
const employeesStore = pathified('employees');
export default {
  components: {
    EmployeeDialog,
  },
  data() {
    return {
      visibleDialog: false,
      currentEmployee: null,
    };
  },
  computed: {
    employees: employeesStore.$get('employees'),
  },
  async created() {
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
      await employeesStore.$dispatch('updateEmployees', payload);
      await employeesStore.$dispatch('getListEmployees');
    },
  },
};
</script>
<style scoped lang="scss">
.employee-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-dialog-min-width: 900px;
  --mdc-dialog-max-height: 800px;
  --mdc-shape-medium: 15px;
}
.employee-list > .table > .head {
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
.employee-list > .table > .body > .row {
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
