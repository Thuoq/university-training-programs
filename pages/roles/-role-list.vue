<template>
  <table class="role-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã nhóm quyền</th>
      <th class="col">Nhóm quyền</th>
      <th class="col">Mô tả</th>
    </tr>
    <tr v-for="role in roles" :key="role.id" class="row">
      <td class="cell">{{ role.id }}</td>
      <td class="cell">{{ role.code }}</td>
      <td class="cell">{{ role.name }}</td>
      <td class="cell">{{ role.description }}</td>
    </tr>
  </table>
</template>
<script>
import { pathified } from '~/utils';

const rolesStore = pathified('roles');
export default {
  computed: {
    roles: rolesStore.$get('roles'),
  },
  async created() {
    await rolesStore.$dispatch('getListRoles');
  },
};
</script>
<style scoped lang="scss">
.role-list {
  border-collapse: collapse;
  padding: 12px 48px 12px 25px;
  font-size: 16px;
  width: 100%;
  > .row {
    border: 1px solid rgba(0, 0, 0, 0.15);
    &.-head {
      color: var(--color-primary);
      font-size: 17px;
      line-height: 21px;
      font-weight: 700;
      text-align: left;
    }
  }
  > .row > .col {
    padding: 10px 0px 10px 10px;
  }
  > .row .col:first-child {
    text-align: center;
  }
  > .row > .cell:first-child {
    text-align: center;
  }
  > .row > .cell {
    padding: 13px 0px 13px 13px;
  }
}
</style>
