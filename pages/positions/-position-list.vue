<template>
  <div class="position-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã nhóm</th>
          <th class="col">Nhóm người dùng</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(position, index) in positions"
          :key="position.id"
          class="row"
          @dblclick.prevent="openDialog(position)"
        >
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ position.code }}</td>
          <td class="cell">{{ position.name }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <position-dialog
          :current-position="currentPosition"
          @closed="closeDialog"
          @submit="onSubmit"
          @delete="onDelete"
        ></position-dialog>
      </app-dialog>
    </table>
  </div>
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
    async onDelete(payload) {
      await positionsStore.$dispatch('deletePosition', payload);
      await positionsStore.$dispatch('getListPositions');
    },
  },
};
</script>
<style scoped lang="scss">
.position-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
}
.position-list > .table > .head {
  color: var(--color-primary);
  font-size: 17px;
  line-height: 21px;
  font-weight: 700;
  width: 100%;
  text-align: left;
  > .row {
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  > .row > .col {
    padding: 10px 0px 10px 10px;
    // position: sticky;
    // top: 0;
    // z-index: 1;
    background-color: rgba($color: #3340bf, $alpha: 0.17);
    &:first-child {
      text-align: center;
    }
  }
}
.position-list > .table > .body > .row {
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  > .cell {
    padding: 13px 0px 13px 13px;
    &:first-child {
      text-align: center;
    }
  }
}
</style>
