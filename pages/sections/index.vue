<template>
  <div class="section-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-section @search="performSearch"></search-section>
      <add-section></add-section>
    </div>
    <section-list></section-list>
  </div>
</template>
<script>
import SectionList from '~/pages/sections/-section-list';
import AddSection from '~/pages/sections/-add-section.vue';
import SearchSection from '~/pages/sections/-section-search.vue';
import { pathified } from '~/utils';
const sectionStore = pathified('sections');
export default {
  components: {
    AddSection,
    SectionList,
    SearchSection,
  },
  data() {
    return {
      title: 'Quản lý Bộ môn',
    };
  },
  methods: {
    async performSearch(payload) {
      await sectionStore.$dispatch('searchListSections', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.section-page {
  > .role-list {
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
