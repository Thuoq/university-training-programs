<template>
  <div class="subject-page">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-subject @search="performSearch"></search-subject>
      <add-subject></add-subject>
    </div>
    <subject-list></subject-list>
  </div>
</template>
<script>
import SubjectList from '~/pages/subjects/-subject-list';
import AddSubject from '~/pages/subjects/-add-subject';
import SearchSubject from '~/pages/subjects/-subject-search.vue';
import { pathified } from '~/utils';
const subjectStore = pathified('subjects');
export default {
  components: {
    AddSubject,
    SubjectList,
    SearchSubject,
  },
  data() {
    return {
      title: 'Quản lý Học phần',
    };
  },
  methods: {
    async performSearch(payload) {
      await subjectStore.$dispatch('searchListSubjects', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.subject-page {
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
