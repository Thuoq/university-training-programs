<template>
  <div class="page-major">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-major @search="performSearch"></search-major>
      <add-major></add-major>
    </div>
    <major-list></major-list>
  </div>
</template>
<script>
import MajorList from '~/pages/majors/-major-list';
import AddMajor from '~/pages/majors/-add-major';
import SearchMajor from '~/pages/majors/-major-search.vue';
import { pathified } from '~/utils';
const majorStore = pathified('majors');
export default {
  components: { AddMajor, MajorList, SearchMajor },
  data() {
    return {
      title: 'Quản lý Ngành học',
    };
  },
  methods: {
    async performSearch(payload) {
      await majorStore.$dispatch('searchListMajors', payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-major {
  > .major-list {
    width: 100%;
  }
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
