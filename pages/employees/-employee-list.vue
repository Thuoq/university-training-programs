<template>
    <table class="employee-list">
      <tr class="row -head">
        <th class="col">STT</th>
        <th class="col">Mã</th>
        <th class="col">Tên người dùng</th>
        <th class="col">Nhóm người dùng</th>
        <th class="col" >Khoa</th>
        <th class="col">Email</th>
      </tr>
      <tr v-for="employee in employees" :key="employee.id" class="row">
        <td class="cell">{{ employee.id }}</td>
        <td class="cell">{{ employee.employeeCode }}</td>
        <td class="cell">
          {{ employee.name }}
          <br>
          <p class="text">{{employee.positionEmployees[0].position.name}}</p>
        </td>
        <td class="cell">{{ employee.role.name }}</td>
        <td class="cell" >{{ employee.faculty.name }}</td>
        <td class="cell">{{ employee.email }}</td>
      </tr>
    </table>
  </template>
  <script>
  import { pathified } from '~/utils';
  const employeesStore = pathified('employees');
  export default {
    computed: {
      employees: employeesStore.$get('employees'),
    },
    async created() {
      await employeesStore.$dispatch('getListEmployees');
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

    >.row >.cell >.text{
      font-size: 12px;
      font-family: 'Inter';
      color: #8C8C8C;
    }
  }
  </style>
  