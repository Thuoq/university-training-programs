<template>
  <div class="page-positions">
    <layout-title :title="title"></layout-title>
    <div class="search-input-row">
      <search-position @search="performSearch"></search-position>
      <add-position></add-position>
    </div>
    <position-list></position-list>
  </div>
</template>
<script>
import PositionList from '~/pages/positions/-position-list';
import AddPosition from '~/pages/positions/-add-position';
import SearchPosition from '~/pages/positions/-position-search.vue';
import { pathified } from '~/utils';
const positionStore = pathified('positions');
export default {
  components: {
    AddPosition,
    PositionList,
    SearchPosition,
  },
  data() {
    return {
      title: 'Quản lý Nhóm người dùng',
    };
  },
  methods: {
    async performSearch(payload) {
      await positionStore.$dispatch('searchListPositions', payload);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-positions {
  // > .positions-list {
  //   width: 100%;
  // }
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
