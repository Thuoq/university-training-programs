<template>
  <div class="page-major">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã ngành học hoặc tên ngành học" @search="onSearch"></app-search>
      <add-major></add-major>
    </div>
    <major-list></major-list>
  </div>
</template>
<script>
import MajorList from '~/pages/majors/-major-list';
import AddMajor from '~/pages/majors/-add-major';
import { pathified } from '~/utils';
const majorsStore = pathified('majors');

export default {
  components: { AddMajor, MajorList },
  data() {
    return {
      title: 'Quản lý Ngành học',
    };
  },
  methods: {
    async onSearch(value) {
      await majorsStore.$dispatch('getListMajors', { textSearch: value });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-major {
  > .major-list {
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
.page-major > .section > .app-search {
  margin-left: 30px;
  width: 400px;
}
</style>
