<template>
  <div>
    <layout-title :title="title"></layout-title>
    <add-employee></add-employee>
    <employee-list></employee-list>
  </div>
</template>
<script>
import EmployeeList from './-employee-list.vue'
import AddEmployee from './-add-employee.vue'
export default {
  components:{
    EmployeeList,
    AddEmployee,
  },
  data() {
    return {
      title: 'Quản lý Người dùng',
    };
  },
};
</script>
