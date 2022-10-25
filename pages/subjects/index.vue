<template>
  <div class="subject-page">
    <layout-title :title="title"></layout-title>
    <add-subject></add-subject>
    <subject-list></subject-list>
  </div>
</template>
<script>
import SubjectList from '~/pages/subjects/-subject-list';
import AddSubject from '~/pages/subjects/-add-subject';
export default {
  components: {
    AddSubject,
    SubjectList,
  },
  data() {
    return {
      title: 'Quản lý Học phần',
    };
  },
};
</script>

<style lang="scss" scoped>
.subject-page {
  > .role-list {
    width: 100%;
  }
  > .add-row {
    text-align: right;
    margin-top: 40px;
    margin-bottom: 54px;
  }
}
</style>
