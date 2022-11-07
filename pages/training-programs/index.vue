<template>
    <div class="trainingProgram-page">
      <layout-title :title="title"></layout-title>
      <trainingProgram-list></trainingProgram-list>
      <add-trainingProgram></add-trainingProgram>
    </div>
  </template>
  <script>
  import TrainingProgramList from '~/pages/training-programs/-add-trainingProgram';
  import AddTrainingProgram from '~/pages/training-programs/-trainingProgram-list';
  export default {
    components: {
        AddTrainingProgram,
        TrainingProgramList,
    },
    data() {
      return {
        title: 'Danh mục Chương trình Đào tạo',
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .trainingProgram-page {
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
  