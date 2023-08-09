<template>
  <div class="faculty-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-faculty @search="performSearch"></search-faculty>
      <add-faculty></add-faculty>
    </div>
    <faculty-list></faculty-list>
  </div>
</template>
<script>
import FacultyList from '~/pages/faculties/-faculty-list';
import AddFaculty from '~/pages/faculties/-add-faculty';
import SearchFaculty from '~/pages/faculties/-faculty-search.vue';
import { pathified } from '~/utils';
const facultyStore = pathified('faculties');
export default {
  components: {
    FacultyList,
    AddFaculty,
    SearchFaculty,
  },
  data() {
    return {
      title: 'Quản lý khoa',
    };
  },
  methods: {
    async performSearch(payload) {
      await facultyStore.$dispatch('searchListFaculties', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.faculty-page {
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
