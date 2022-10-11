<template>
  <div class="wapper">
    <div class="img">
      <img src="~/static/logotlu1.png" width="329px" height="106px" alt="logoTLU" />
    </div>
    <div class="text-block">Hệ thống Quản lý Chương trình Đào tạo</div>
    <div class="acc-block">
      <div class="icon-block">
        <img class="icon" src="~/static/user.png" width="45px" height="45px" alt="userIcon" />
      </div>
      <div class="infor-block">
        <div class="infor">
          <span>Xin chào,</span>
          <br />
          <span class="text-infor">{{currentUser.employeeCode}} - {{currentUser.name}}</span>
        </div>
        <div class="link-block">
          <nuxt-link class="link" to="/reset-password"> Đổi mật khẩu? </nuxt-link>
          <Logout class="link" style="margin-left: 30px;"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logout from '../../logout/index.vue'
import { pathified } from '~/utils';
const { $get } = pathified('user');
export default {
  components:{
    Logout,
  },
  computed: {
    currentUser: $get('currentUser'),
  },
};
</script>

<style scoped>
.wapper {
  width: 100%;
  height: 106px;
  margin: 0 auto;
  display: flex;
  /* margin-bottom: 4.5px; */
  /* margin-left: 50px; */
}

.img{
  width: 20%;
}

.text-block {
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-left: 23px;
  /* margin-left: 187.5px; */
  font-size: 32.25px;
  font-weight: bold;
  color: #3c4069;
  font-family: 'Arial';
  /* background-color: beige; */
  width: 58%;
}

.acc-block {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 9px;
  /* background-color: darkcyan; */
  width: 22%;
}

.icon-block {
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 70px;
  height: 70px; */
  margin-top: 2.25px;
  margin-bottom: 2.25px;
  /* background-color: aliceblue; */
}

.icon {
  border-radius: 50%;
  background-color: #878787;
}

.infor-block {
  margin-left: 11.25px;
  /* background-color: aliceblue; */
  font-size: 13.5px;
  font-family: 'Arial';
}

.text-infor {
  font-weight: bold;
  color: red;
}

.text-greeting {
  font-weight: 400;
}

.link-block{
  display: flex;
}

.link {
  font-size: 12px;
  text-decoration: underline;
}
</style>
