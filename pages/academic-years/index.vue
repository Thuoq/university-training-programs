<template>
    <div class="academicYear-page">
      <layout-title :title="title"></layout-title>
      <add-academicYear></add-academicYear>
      <academicYear-list></academicYear-list>
    </div>
  </template>
  <script>
  import AcademicYearList from '~/pages/academic-years/-academicYear-list';
  import AddAcademicYear from '~/pages/academic-years/-add-academicYear';
  export default {
    components: {
        AcademicYearList,
        AddAcademicYear
    },
    data() {
      return {
        title: 'Quản lý Khóa/Năm học',
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .academicYear-page {
    > .role-list {
      width: 100%;
    }
    > .add-row {
      text-align: right;
      margin-top: 40px;
      margin-bottom: 54px;
    }
  }
  </style>
  