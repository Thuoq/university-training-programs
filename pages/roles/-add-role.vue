<template>
  <div class="add-row">
    <app-button class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <div class="dialog-container">
        <h2 class="title">Thêm mới Nhóm quyền</h2>
        <div class="body"></div>
        <div class="footer">
          <app-button class="btn -delete">Huỷ</app-button>
          <app-button class="btn -save">Lưu</app-button>
        </div>
      </div>
    </app-dialog>
  </div>
</template>
<script>
export default {
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
  },
};
</script>
<style lang="scss" scoped>
.add-row {
  padding: 12px 48px 12px 25px;
  > .btn {
    width: 150px;
    height: 36px;
    background: #d3d8ea;
    border: 1px solid #000000;
    cursor: pointer;
  }
}
</style>
