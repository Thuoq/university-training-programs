<template>
  <div class="employee-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <table class="table">
        <tr class="row">
          <td class="cell">Mã đăng nhập</td>
          <td class="cell"><app-input type="text" class="input" required></app-input></td>
        </tr>
        <tr class="row">
          <td class="cell">Email</td>
          <td class="cell"><app-input type="text" class="input" required></app-input></td>
        </tr>
        <tr class="row">
          <td class="cell">Nhóm quyền</td>
          <td class="cell"><app-select :roles="roles">
        </app-select></td>
        </tr>
        <tr class="row">
          <td class="cell">Khoa</td>
          <td class="cell"><app-select class="select" required></app-select></td>
        </tr>
      </table>
      <table class="table" style="margin-left: 30px">
        <tr class="row">
          <td class="cell">Tên người dùng</td>
          <td class="cell"><app-input type="text" class="input" required></app-input></td>
        </tr>
        <tr class="row">
          <td class="cell">Mật khẩu</td>
          <td class="cell"><app-input type="text" class="input" required></app-input></td>
        </tr>
        <tr class="row">
          <td class="cell">Nhóm người dùng</td>
          <td class="cell"><app-select class="select" required></app-select></td>
        </tr>
        <tr class="row">
          <td class="cell">Bộ môn</td>
          <td class="cell"><app-select required></app-select></td>
        </tr>
      </table>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save">Lưu</app-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
  },
//   data() {
//     return {
//       name: '',
//     };
//   },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    //   onSubmit() {
    //     const payload = this.$data;
    //     this.$emit('submit', payload);
    //     this.$emit('closed');
    //   },
  },
};
</script>

<style lang="scss" scoped>
.employee-dialog {
  > .title {
    margin: -19px -24px 0px -24px;
    padding-top: 13px;
    padding-bottom: 10px;
    height: 27px;
    text-align: center;
    font-size: 17px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    color: var(--color-back);
    background: #ebebeb;
    border-bottom: 1px solid var(--color-back);
  }

  > .body {
    display: flex;
    // border: 1px solid black;
    margin-top: 26px;
    margin-bottom: 26px;
    > table {
      width: 100%;
      text-align: left;
    }
    > table > .row {
      height: 70px;
    }
    > table > .row > .cell > .input {
      height: 32px;
    }
    // >table >.row >.cell>.select{

    // }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin: 0px 50px 0px 50px;
  }

  > .footer > .btn {
    &.-save {
      --mdc-theme-primary: var(--color-primary);
    }
    &.-delete {
      --mdc-theme-primary: var(--color-gray-base);
      --mdc-theme-on-primary: var(--color-back);
    }
  }
}
</style>
