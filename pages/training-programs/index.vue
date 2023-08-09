<template>
  <div class="trainingProgram-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-trainingProgram @search="performSearch"></search-trainingProgram>
      <add-trainingProgram></add-trainingProgram>
    </div>
    <trainingProgram-list></trainingProgram-list>
  </div>
</template>
<script>
import AddTrainingProgram from '~/pages/training-programs/-add-trainingProgram';
import TrainingProgramList from '~/pages/training-programs/-trainingProgram-list';
import SearchTrainingProgram from '~/pages/training-programs/-trainingProgram-search.vue';
import { pathified } from '~/utils';
const trainingProgramStore = pathified('trainingPrograms');
export default {
  components: {
    AddTrainingProgram,
    TrainingProgramList,
    SearchTrainingProgram,
  },
  data() {
    return {
      title: 'Danh mục Chương trình Đào tạo',
    };
  },
  methods: {
    async performSearch(payload) {
      await trainingProgramStore.$dispatch('searchListTrainingPrograms', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.trainingProgram-page {
  // > .role-list {
  //   width: 100%;
  // }
  // > .add-row {
  //   text-align: right;
  //   margin-top: 30px;
  //   margin-bottom: 40px;
  // }
  > .search-input-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 30px;
  }
}
</style>
