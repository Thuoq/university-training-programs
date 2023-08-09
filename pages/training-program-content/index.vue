<template>
  <div class="trainingProgram-page">
    <layout-title :title="title"></layout-title>
    <div class="search-row">
      <SearchTrainingProgramContent @search="performSearch"></SearchTrainingProgramContent>
    </div>
    <trainingProgramContent-list></trainingProgramContent-list>
  </div>
</template>
<script>
import TrainingProgramContentList from '~/pages/training-program-content/-trainingProgramContent-list';
import SearchTrainingProgramContent from '~/pages/training-program-content/-trainingProgramContent-search.vue';
import { pathified } from '~/utils';
const trainingProgramStore = pathified('trainingPrograms');
export default {
  components: {
    TrainingProgramContentList,
    SearchTrainingProgramContent,
  },
  data() {
    return {
      title: 'Quản lý Chương trình Đào tạo',
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
  > .search-row {
    text-align: left;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 40%;
  }
}
</style>
