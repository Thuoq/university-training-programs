<template>
  <div class="ct">
    <div class="text-center pt-4">
      <img src="~/static/logotlu.png" width="250px" height="250px" alt="logoTLU" />
    </div>
    <h6 v-if="loginFail === true" class="text-center">Mã đăng nhập hoặc mật khẩu không chính xác!</h6>
    <form @submit.prevent="onSubmit">
      <div class="form_group text-center mt-5 input-icons">
        <i class="icon"><font-awesome-icon :icon="['fas', 'user']" /></i>
        <input v-model="employeeCode" class="input-form" type="text" placeholder="Mã giáo viên" required/>
      </div>

      <div class="form_group text-center mt-5 input-icons">
        <i class="icon"><font-awesome-icon :icon="['fas', 'lock']" /></i>
        <input v-model="password" class="input-form" type="password" placeholder="Mật khẩu" autocomplete="off" required/>
      </div>

      <div class="form_group pt-3">
        <nuxt-link to="/forgetpassword">
          <span><font-awesome-icon :icon="['fas', 'key']" /></span>
          Quên mật khẩu?
        </nuxt-link>
      </div>

      <div class="form_group text-center">
        <button type="submit">Đăng Nhập</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
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
  methods: {
    onSubmit() {
      const userAcc = {
        employeeCode: this.employeeCode,
        password: this.password,
      };
      
      this.$axios
        .$post('http://localhost:5000/auth/signIn', userAcc)
        .then((result) => {
          this.$router.push('/')
        })
        .catch((e) => {
            this.loginFail = true;
          }
        );

    },
  },
};
</script>

<style scoped>
.ct {
  width: 500px;
  margin: auto;
  /* background-color: aqua; */
}

.input-form {
  width: 350px;
  height: 48px;
  padding-left: 50px;
}

input[type='text'],
input[type='password'] {
  background-color: #d9d9d9;
  border-radius: 9px;
  font-family: Inder;
  font-weight: 400;
  font-size: 20px;
  border: none;
}

a {
  margin-left: 290px;
  color: black;
}

button {
  color: white;
  background-color: #2c3383;
  width: 180px;
  height: 52px;
  border-radius: 12px;
  font-family: Inder;
  font-weight: bold;
  font-size: 20px;
  margin-top: 70px;
  border: 10px solid transparent;
}

.input-icons i {
  position: absolute;
}

.input-icons {
  margin-bottom: 10px;
}

.icon {
  padding: 10px;
}

h6 {
  color: red;
  font-size: 15px;
  margin-top: 30px;
  margin-bottom: -30px;
}
</style>
