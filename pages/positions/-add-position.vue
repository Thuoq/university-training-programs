<template>
    <div class="add-row">
      <app-button raised class="btn" @click.prevent="openDialog">
        <mwc-icon class="icon">add</mwc-icon>
        Thêm mới
      </app-button>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <position-dialog @closed="closeDialog" @submit="onSubmit"></position-dialog>
      </app-dialog>
    </div>
  </template>
  <script>
  import PositionDialog from '~/pages/positions/-position-dialog';
  import { pathified } from '~/utils';
  const positionStore = pathified('positions');

  export default {
    components: { PositionDialog },
    data() {
      return {
        visibleDialog: false,
      };
    },
    methods: {
      openDialog() {
        this.visibleDialog = true;
      },
      closeDialog() {
        this.visibleDialog = false;
      },
      async onSubmit(payload) {
        await positionStore.$dispatch('createPositions', payload);
        await positionStore.$dispatch('getListPositions');
      },
    },
  };
  </script>
  <style lang="scss" scoped>
  .add-row {
    padding: 12px 48px 12px 25px;
    > .btn {
      width: 200px;
      height: 36px;
      background: #d3d8ea;
    //   border: 1px solid #000000;
      cursor: pointer;
      --mdc-theme-primary: var(--color-primary);
      --mdc-button-horizontal-padding: 10px;
    }
    --mdc-dialog-min-width: 560px;
    --mdc-dialog-max-height: 560px;
    --mdc-shape-medium: 15px;
  }
  </style>