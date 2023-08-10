<template>
  <div class="faculty-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Tìm kiếm theo mã khoa hoặc tên khoa" @search="onSearch"></app-search>
      <add-faculty></add-faculty>
    </div>
    <faculty-list></faculty-list>
  </div>
</template>
<script>
import FacultyList from '~/pages/faculties/-faculty-list';
import AddFaculty from '~/pages/faculties/-add-faculty';
import { pathified } from '~/utils';
const facultiesStore = pathified('faculties');

export default {
  components: {
    FacultyList,
    AddFaculty,
  },
  data() {
    return {
      title: 'Quản lý khoa',
    };
  },
  methods: {
    async onSearch(val) {
      await facultiesStore.$dispatch('getListFaculties', {
        textSearch: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.faculty-page {
  > .role-list {
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
.faculty-page > .section > .app-search {
  margin-left: 30px;
  width: 350px;
}
</style>
