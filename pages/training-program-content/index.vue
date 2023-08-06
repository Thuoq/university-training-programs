<template>
  <div class="trainingProgram-page">
    <layout-title :title="title"></layout-title>
    <trainingProgramContent-list></trainingProgramContent-list>
  </div>
</template>
<script>
import TrainingProgramContentList from '~/pages/training-program-content/-trainingProgramContent-list';
export default {
  components: {
    TrainingProgramContentList,
  },
  data() {
    return {
      title: 'Quản lý Chương trình Đào tạo',
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
