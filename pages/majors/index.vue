<template>
    <div class="page-major">
      <layout-title :title="title"></layout-title>
      <add-major></add-major>
      <major-list></major-list>
    </div>
  </template>
  <script>
  import MajorList from '~/pages/majors/-major-list';
  import AddMajor from '~/pages/majors/-add-major';
  export default {
    components: { AddMajor, MajorList },
    data() {
      return {
        title: 'Quản lý Ngành học',
      };
    },
  };
  </script>
  <style lang="scss" scoped>
  .page-major {
    > .major-list {
      width: 100%;
    }
    > .add-row {
      text-align: right;
      margin-top: 40px;
      margin-bottom: 54px;
    }
  }
  </style>
  