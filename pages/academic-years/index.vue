<template>
  <div class="academic-year-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã khoá hoặc tên khoá" @search="onSearch"></app-search>
      <add-academicYear></add-academicYear>
    </div>
    <academicYear-list></academicYear-list>
  </div>
</template>
<script>
import AcademicYearList from '~/pages/academic-years/-academicYear-list';
import AddAcademicYear from '~/pages/academic-years/-add-academicYear';
import { pathified } from '~/utils';
const academicYearStore = pathified('academicYears');

export default {
  components: {
    AcademicYearList,
    AddAcademicYear,
  },
  data() {
    return {
      title: 'Quản lý Năm học/Khóa',
    };
  },
  methods: {
    async onSearch(value) {
      await academicYearStore.$dispatch('getListAcademicYears', { textSearch: value });
    },
  },
};
</script>

<style lang="scss" scoped>
.academic-year-page {
  > .academicYears-list {
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
.academic-year-page > .section > .app-search {
  margin-left: 30px;
  width: 350px;
}
</style>
