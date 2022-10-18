<template>
    <div class="section-page">
      <layout-title :title="title"></layout-title>
      <!-- <add-faculty></add-faculty>
      <faculty-list></faculty-list> -->
    </div>
  </template>
  <script>
//   import FacultyList from '~/pages/faculties/-faculty-list';
//   import AddFaculty from '~/pages/faculties/-add-faculty';
  export default {
    // components: {
    //   FacultyList,
    //   AddFaculty,
    // },
    data() {
      return {
        title: 'Quản lý bộ môn',
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .section-page {
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
  