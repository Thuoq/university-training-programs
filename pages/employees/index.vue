<template>
  <div class="employee-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Tìm kiếm nhân viên theo tên hoặc mã" @search="onSearch"></app-search>
      <add-employee></add-employee>
    </div>
    <employee-list></employee-list>
  </div>
</template>
<script>
import EmployeeList from './-employee-list.vue';
import AddEmployee from './-add-employee.vue';
import { pathified } from '~/utils';
const employeesStore = pathified('employees');

export default {
  components: {
    EmployeeList,
    AddEmployee,
  },
  data() {
    return {
      title: 'Quản lý Người dùng',
    };
  },
  methods: {
    async onSearch(val) {
      await employeesStore.$dispatch('getListEmployees', {
        textSearch: val,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.employee-page {
  > .role-list {
    width: 100%;
  }
  > .section {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  > .section > .add-row {
    text-align: right;
  }
}
.employee-page > .section > .app-search {
  margin-left: 30px;
  width: 350px;
}
</style>
