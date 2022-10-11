<template>
  <div class="logout">
    <span @click.prevent="openDialog"> Đăng xuất </span>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <div class="dialog-container">
        <p class="noti">Bạn có chắc chắn muốn đăng xuất</p>
        <div class="btngroup">
          <app-button class="btndelete" @click="closeDialog">Huỷ</app-button>
          <app-button class="btnlogout" @click="logOut">Đăng xuất</app-button>
        </div>
      </div>
    </app-dialog>
  </div>
</template>
<script>
import { pathified } from '~/utils';
const { $dispatch} = pathified('user');
export default {
  // computed: {
  //   currentUser: $get('currentUser'),
  // },
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
    async logOut(){
      await $dispatch('logOut');
      window.localStorage.removeItem('user');
      this.$router.push('/login')
    }
  },
};
</script>
<style scoped>
.dialog-container{
  text-align: center;
  width: 439px;
}

.noti{
  font-family: 'Inter';
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding: 44px 46px 42px 41px;
}
.btngroup{
  display: flex;
  justify-content: space-around;
}
.btndelete{
  width: 84px;
  height: 35.7px;
  border: 10px;
  color: #000;
}

.btnlogout{
  width: 130px;
  height: 35.7px;
  border: 10px;
  color: #000;
}
</style>
