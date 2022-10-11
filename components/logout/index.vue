<template>
  <div class="logout">
    <span @click.prevent="openDialog"> Đăng xuất </span>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <div class="dialog-container">
        <p class="notification">Bạn có chắc chắn muốn đăng xuất?</p>
        <div class="btngroup">
          <app-button raised class="btncancel" @click="closeDialog">Huỷ</app-button>
          <app-button raised class="btnlogout" @click="logOut">Đăng xuất</app-button>
        </div>
      </div>
    </app-dialog>
  </div>
</template>
<script>
import { pathified } from '~/utils';
const { $dispatch } = pathified('user');

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
    async logOut() {
      await $dispatch('logOut');
      window.localStorage.removeItem('user');
      await this.$router.push('/login');
    },
  },
};
</script>
<style lang="scss" scoped>
.logout {
  .dialog-container {
    > .notification {
      font-size: 20px;
      color: black;
      font-weight: bold;
      padding: 44px 46px 42px 41px;
    }
    > .btngroup {
      display: flex;
      justify-content: space-around;
    }

    > .btngroup > .btncancel {
        --mdc-theme-primary: var(--color-gray-base);
        --mdc-theme-on-primary: var(--color-black);
    }

    > .btngroup > .btnlogout {
        --mdc-theme-primary: var(--color-primary);
    }
  }
}
</style>
