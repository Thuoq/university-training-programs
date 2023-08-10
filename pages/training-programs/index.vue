<template>
  <div class="training-program-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã CTĐT hoặc Tên CTĐT " @search="onSearch"></app-search>
      <add-trainingProgram></add-trainingProgram>
    </div>
    <trainingProgram-list></trainingProgram-list>
  </div>
</template>
<script>
import AddTrainingProgram from '~/pages/training-programs/-add-trainingProgram';
import TrainingProgramList from '~/pages/training-programs/-trainingProgram-list';
import { pathified } from '~/utils';
const trainingProgramsStore = pathified('trainingPrograms');

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
  methods: {
    async onSearch(value) {
      await trainingProgramsStore.$dispatch('getListTrainingPrograms', {
        textSearch: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.training-program-page {
  > .trainingPrograms-list {
    width: 100%;
  }
  > .section {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 40px;
  }
  > .section > .add-row {
    text-align: right;
  }
}
.training-program-page > .section > .app-search {
  margin-left: 30px;
  width: 410px;
}
</style>
