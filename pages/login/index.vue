<template>
  <div class="container">
    <img src="~/static/logotlu.png" class="img" alt="logoTLU" />
    <h6 v-if="loginFail === true" class="text-center">Mã đăng nhập hoặc mật khẩu không chính xác!</h6>
    <form class="formlogin" @submit.prevent="onSubmit">
      <div class="form">
        <mwc-icon class="icon">account_circle</mwc-icon>
        <input v-model="employeeCode" class="input" type="text" placeholder="Mã giáo viên" required />
      </div>

      <div class="form">
        <mwc-icon class="icon">lock</mwc-icon>
        <input v-model="password" class="input" type="password" placeholder="Mật khẩu" autocomplete="off" required />
      </div>

      <div class="form -text-right">
        <nuxt-link class="forgotpassword" to="/forgetpassword">
          <span><font-awesome-icon :icon="['fas', 'key']" /></span>
          Quên mật khẩu?
        </nuxt-link>
      </div>

      <div class="form">
        <button class="button" type="submit">Đăng Nhập</button>
      </div>
    </form>
  </div>
</template>

<script>
import { pathified } from '~/utils';
const { $dispatch, $get } = pathified('user');

export default {
  middleware({ store, redirect }) {
    const currentUser = store.state?.user?.currentUser;
    if (currentUser) {
      return redirect('/');
    }
  },
  data() {
    return {
      employeeCode: '',
      password: '',
      loginFail: false,
    };
  },
  head: {
    title: 'Đăng nhập | Quản lí đào tạo',
  },
  computed: {
    currentUser: $get('currentUser'),
  },
  methods: {
    async onSubmit() {
      const userAcc = {
        employeeCode: this.employeeCode,
        password: this.password,
      };
      await $dispatch('signIn', userAcc);
      if (this.currentUser) {
        window.localStorage.setItem('user', JSON.stringify(this.currentUser));
        await this.$router.push('/');
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  margin: 150px auto;
  background-color: var(--color-white);
  text-align: center;
  height: 600px;
  width: 300px !important;
  > .img {
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
  }
  > .formlogin {
    > .form {
      position: relative;
      &.-text-right {
        text-align: right;
      }
    }
    > .form:not(:last-child) {
      margin-bottom: 20px;
    }
  }
  > .formlogin > .form > .input {
    background-color: var(--color-gray-base);
    width: 90%;
    height: 40px;
    padding: 5px 5px 5px 25px;
    border-radius: 10px;
  }
  > .formlogin > .form > .icon {
    position: absolute;
    top: 33%;
    left: 2%;
    font-size: 16px;
  }
  > .formlogin > .form > .button {
    color: var(--color-white);
    background: #2c3383;
    border-radius: 17px;
    height: 50px;
    width: 70%;
    cursor: pointer;
  }
}
</style>
