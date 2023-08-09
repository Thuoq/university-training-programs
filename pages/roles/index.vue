<template>
  <div class="page-role">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-role @search="performSearch"></search-role>
      <add-role></add-role>
    </div>
    <role-list></role-list>
  </div>
</template>
<script>
import RoleList from '~/pages/roles/-role-list';
import AddRole from '~/pages/roles/-add-role';
import SearchRole from '~/pages/roles/-role-search.vue';
import { pathified } from '~/utils';
const roleStore = pathified('roles');
export default {
  components: { AddRole, RoleList, SearchRole },
  data() {
    return {
      title: 'Quản lý nhóm quyền',
    };
  },
  methods: {
    async performSearch(payload) {
      await roleStore.$dispatch('searchListRoles', payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-role {
  > .role-list {
    width: 100%;
  }
  // > .add-row {
  //   text-align: right;
  //   margin-top: 40px;
  //   margin-bottom: 54px;
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
