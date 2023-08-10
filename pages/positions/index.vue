<template>
  <div class="page-positions">
    <layout-title :title="title"></layout-title>
    <div class="section">
      <app-search placeholder="Mã nhóm hoặc tên hoặc nhóm người dùng" @search="onSearch"></app-search>
      <add-position></add-position>
    </div>
    <position-list></position-list>
  </div>
</template>
<script>
import PositionList from '~/pages/positions/-position-list';
import AddPosition from '~/pages/positions/-add-position';
import { pathified } from '~/utils';
const positionsStore = pathified('positions');

export default {
  components: {
    AddPosition,
    PositionList,
  },
  data() {
    return {
      title: 'Quản lý Nhóm người dùng',
    };
  },
  methods: {
    async onSearch(value) {
      await positionsStore.$dispatch('getListPositions', {
        textSearch: value,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.page-positions {
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
.page-positions > .section > .app-search {
  margin-left: 30px;
  width: 410px;
}
</style>
