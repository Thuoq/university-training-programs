<template>
    <div class="page-positions">
      <layout-title :title="title"></layout-title>
      <add-position></add-position>
      <position-list></position-list>
    </div>
  </template>
  <script>
  import PositionList from '~/pages/positions/-position-list';
  import AddPosition  from  '~/pages/positions/-add-position';
  export default {
    components:{
        AddPosition,
        PositionList,
    },
    data() {
      return {
        title: 'Quản lý Nhóm người dùng (chức vụ)',
      };
    },
  };
  </script>
  <style lang="scss" scoped>
  .page-positions {
    > .positions-list {
      width: 100%;
    }
    > .add-row {
      text-align: right;
      margin-top: 40px;
      margin-bottom: 54px;
    }
  }
  </style>
  