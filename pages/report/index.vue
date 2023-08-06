<template>
    <div class="trainingProgram-page">
      <layout-title :title="title"></layout-title>
      <report-list></report-list>
    </div>
  </template>
  <script>
  import ReportList from '~/pages/report/-report-list.vue';
  export default {
    components: {
        ReportList,
    },
    data() {
      return {
        title: 'Thống kê',
      };
    },
  };
  </script>
  
