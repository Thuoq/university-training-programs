<template>
  <table class="position-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã nhóm</th>
      <th class="col">Nhóm người dùng</th>
    </tr>
    <tr v-for="(position, index) in positions" :key="position.id" class="row" @dblclick.prevent="openDialog(position)">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ position.code }}</td>
      <td class="cell">{{ position.name }}</td>
    </tr>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <position-dialog
        :isEdit="isEdit"
        :currentPosition="currentPosition"
        @closed="closeDialog"
        @submit="onSubmit"
      ></position-dialog>
    </app-dialog>
  </table>
</template>
<script>
import PositionDialog from '~/pages/positions/-position-dialog';
import { pathified } from '~/utils';
const positionsStore = pathified('positions');
export default {
  components: { PositionDialog },
  data() {
    return {
      visibleDialog: false,
      isEdit: true,
      currentPosition: null,
    };
  },
  computed: {
    positions: positionsStore.$get('positions'),
  },
  async created() {
    await positionsStore.$dispatch('getListPositions');
  },
  methods: {
    openDialog(position) {
      this.visibleDialog = true;
      this.currentPosition = position;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await positionsStore.$dispatch('updatePositions', payload);
      await positionsStore.$dispatch('getListPositions');
    },
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
      background-color: rgba($color: #3340bf, $alpha: 0.17);
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
  --mdc-shape-medium: 15px;
}
</style>
