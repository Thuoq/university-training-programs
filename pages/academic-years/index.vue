<template>
  <div class="academicYear-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-academicYear @search="performSearch"></search-academicYear>
      <add-academicYear></add-academicYear>
    </div>
    <academicYear-list></academicYear-list>
  </div>
</template>
<script>
import AcademicYearList from '~/pages/academic-years/-academicYear-list';
import AddAcademicYear from '~/pages/academic-years/-add-academicYear';
import SearchAcademicYear from '~/pages/academic-years/-academicYear-search';
import { pathified } from '~/utils';
const academicYearStore = pathified('academicYears');
export default {
  components: {
    AcademicYearList,
    AddAcademicYear,
    SearchAcademicYear,
  },
  data() {
    return {
      title: 'Quản lý Năm học/Khóa',
    };
  },
  methods: {
    async performSearch(payload) {
      await academicYearStore.$dispatch('searchListAcademicYears', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.academicYear-page {
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
    margin-bottom: 40px;
  }
}
</style>
