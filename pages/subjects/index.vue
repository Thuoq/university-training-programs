<template>
  <div class="subject-page">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã học phần hoặc tên học phần hoặc hp tiên quyết" @search="onSearch"></app-search>
      <add-subject></add-subject>
    </div>
    <subject-list></subject-list>
  </div>
</template>
<script>
import SubjectList from '~/pages/subjects/-subject-list';
import AddSubject from '~/pages/subjects/-add-subject';
import { pathified } from '~/utils';
const subjectsStore = pathified('subjects');

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
  methods: {
    async onSearch(value) {
      await subjectsStore.$dispatch('getListSubjects', {
        textSearch: value,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.subject-page {
  > .subject-list {
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
.subject-page > .section > .app-search {
  margin-left: 30px;
  width: 410px;
}
</style>
