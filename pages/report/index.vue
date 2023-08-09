<template>
  <div class="report-page">
    <layout-title :title="title"></layout-title>
    <div class="search-row">
      <SearchReport @search="performSearch"></SearchReport>
    </div>
    <report-list></report-list>
  </div>
</template>
<script>
import ReportList from '~/pages/report/-report-list.vue';
import SearchReport from '~/pages/report/-report-search.vue';
import { pathified } from '~/utils';
const trainingProgramStore = pathified('trainingPrograms');
export default {
  components: {
    ReportList,
    SearchReport,
  },
  data() {
    return {
      title: 'Thống kê',
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
.report-page {
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
