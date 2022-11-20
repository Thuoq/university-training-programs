<template>
  <div class="trainingProgram-page">
    <layout-title :title="title"></layout-title>
    <add-trainingProgram></add-trainingProgram>
    <trainingProgram-list></trainingProgram-list>
  </div>
</template>
<script>
import AddTrainingProgram from '~/pages/training-programs/-add-trainingProgram';
import TrainingProgramList from '~/pages/training-programs/-trainingProgram-list';
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
