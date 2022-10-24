<template>
  <table class="position-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã nhóm</th>
      <th class="col">Nhóm người dùng</th>
    </tr>
    <tr v-for="(position, index) in positions" :key="position.id" class="row">
      <td class="cell">{{index + 1}}</td>
      <td class="cell">{{ position.code }}</td>
      <td class="cell">{{ position.name }}</td>
    </tr>
  </table>
</template>
<script>
import { pathified } from '~/utils';
const positionsStore = pathified('positions');
export default {
  computed: {
    positions: positionsStore.$get('positions'),
  },
  async created() {
    await positionsStore.$dispatch('getListPositions');
  },
};
</script>
<style scoped lang="scss">
.position-list {
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
