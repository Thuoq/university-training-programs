<template>
  <div class="container">
    <img src="~/static/logotlu.png" class="img" alt="logoTLU" />
    <p class="notification">Mã đăng nhập là mã nhân viên của bạn tại trường.</p>
    <form class="form_forgot_pass"  @submit.prevent="onSubmit">
      <div class="form">
        <i class="icon"><font-awesome-icon :icon="['fas', 'user']" style="font-size: 1.5rem" /></i>
        <input v-model="employeeCode" class="input" type="text" placeholder="Mã đăng nhập" required />
      </div>
      <div class="form">
        <button class="button" type="submit">Cấp lại mật khẩu</button>
      </div>
    </form>
  </div>
</template>
<script>
export default{
  data(){
    return {
      employeeCode: '',
    };
  },
  methods:{
    onSubmit(){
      console.log(this.employeeCode)
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  margin: 100px auto;
  background-color: var(--color-white);
  text-align: center;
  height: 600px;
  width: 600px !important;
  margin-top: 0px !important;
  > .img {
    width: 300px;
    height: 300px;
    margin-bottom: 49px;
  }

  > .notification {
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 55px;
    font-family: 'Arial';
  }

  > .form_forgot_pass {
    > .form {
      position: relative;
      &.-text-right {
        text-align: right;
      }
    }
  }

  > .form_forgot_pass > .form > .input {
    background-color: var(--color-gray-base);
    width: 65%;
    height: 50px;
    padding: 5px 5px 5px 70px;
    border-radius: 10px;
    font-size: 17px;
    font-weight: 400;
    font-family: 'Arial';
  }

  > .form_forgot_passs > .form > .icon {
    // width: 39.44px;
    // height: 39.44px;
    position: absolute;
    top: 25%;
    left: 15%;
  }
  > .form_forgot_pass > .form > .button {
    margin-top: 70px;
    color: var(--color-white);
    background: #2c3383;
    border-radius: 17px;
    height: 44px;
    width: 37%;
    font-weight: 600;
    font-size: 20px;
    font-family: 'Inter';
  }
}
</style>
