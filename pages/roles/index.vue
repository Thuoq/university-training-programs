<template>
  <div class="page-role">
    <layout-title :title="title"></layout-title>
    <add-role></add-role>
    <role-list></role-list>
  </div>
</template>
<script>
import RoleList from '~/pages/roles/-role-list';
import AddRole from '~/pages/roles/-add-role';
export default {
  components: { AddRole, RoleList },
  data() {
    return {
      title: 'Quản lý nhóm quyền',
    };
  },
};
</script>
<style lang="scss" scoped>
.page-role {
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
