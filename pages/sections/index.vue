<template>
  <div class="section-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Tìm kiếm theo mã môn hoặc tên môn hoặc tên khoa" @search="onSearch"></app-search>
      <add-section></add-section>
    </div>

    <section-list></section-list>
  </div>
</template>
<script>
import SectionList from '~/pages/sections/-section-list';
import AddSection from '~/pages/sections/-add-section.vue';
import { pathified } from '~/utils';
const sectionsStore = pathified('sections');

export default {
  components: {
    AddSection,
    SectionList,
  },
  data() {
    return {
      title: 'Quản lý Bộ môn',
    };
  },
  methods: {
    async onSearch(value) {
      await sectionsStore.$dispatch('getListSections', { textSearch: value });
    },
  },
};
</script>

<style lang="scss" scoped>
.section-page {
  > .section-list {
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
.section-page > .section > .app-search {
  margin-left: 30px;
  width: 400px;
}
</style>
