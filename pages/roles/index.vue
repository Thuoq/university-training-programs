<template>
  <div class="page-role">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã nhóm quyền hoặc tên nhóm quyền" @search="onSearch"></app-search>
      <add-role></add-role>
    </div>
    <role-list></role-list>
  </div>
</template>
<script>
import RoleList from '~/pages/roles/-role-list';
import AddRole from '~/pages/roles/-add-role';
import { pathified } from '~/utils';
const rolesStore = pathified('roles');

export default {
  components: { AddRole, RoleList },
  data() {
    return {
      title: 'Quản lý nhóm quyền',
    };
  },
  methods: {
    async onSearch(value) {
      await rolesStore.$dispatch('getListRoles', {
        textSearch: value,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-role {
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
.page-role > .section > .app-search {
  margin-left: 30px;
  width: 410px;
}
</style>
