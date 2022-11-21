<template>
    <div class="section-page">
      <layout-title :title="title"></layout-title>
      <add-section></add-section>
      <section-list></section-list>
    </div>
  </template>
  <script>
  import SectionList from '~/pages/sections/-section-list';
  import AddSection from '~/pages/sections/-add-section.vue';
  export default {
    components: {
      AddSection,
      SectionList,
    },
    data() {
      return {
        title: 'Quản lý Bộ môn',
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
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
  </style>
  