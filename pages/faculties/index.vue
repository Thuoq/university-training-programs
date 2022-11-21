<template>
  <div class="faculty-page">
    <layout-title :title="title"></layout-title>
    <add-faculty></add-faculty>
    <faculty-list></faculty-list>
  </div>
</template>
<script>
import FacultyList from '~/pages/faculties/-faculty-list';
import AddFaculty from '~/pages/faculties/-add-faculty';
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
};
</script>

<style lang="scss" scoped>
.faculty-page {
  > .role-list {
    width: 100%;
  }
  > .add-row {
    text-align: right;
    margin-top: 30px;
    margin-bottom: 40px;
  }
}
</style>
