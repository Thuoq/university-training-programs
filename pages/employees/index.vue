<template>
  <div class="employees-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-employee @search="performSearch"></search-employee>
      <add-employee></add-employee>
    </div>
    <employee-list></employee-list>
  </div>
</template>
<script>
import EmployeeList from './-employee-list.vue';
import AddEmployee from './-add-employee.vue';
import SearchEmployee from './-employee-search.vue';
import { pathified } from '~/utils';
const employeeStore = pathified('employees');
export default {
  components: {
    EmployeeList,
    AddEmployee,
    SearchEmployee,
  },
  data() {
    return {
      title: 'Quản lý Người dùng',
    };
  },
  methods: {
    async performSearch(payload) {
      await employeeStore.$dispatch('searchListEmployees', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.employees-page {
  // > .role-list {
  //   width: 100%;
  // }
  > .search-input-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
