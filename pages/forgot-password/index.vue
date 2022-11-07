<template>
  <div class="container">
    <img src="~/static/logotlu.png" class="img" alt="logoTLU" />
    <p class="notification">Mã đăng nhập là mã nhân viên của bạn tại trường!</p>
    <form class="formfogotpass" @submit.prevent="onSubmit">
      <div class="form">
        <mwc-icon class="icon">account_circle</mwc-icon>
        <input v-model="employeeCode" class="input" type="text" placeholder="Mã giáo viên" required />
      </div>
      <div class="form">
        <button class="button" type="submit">Cấp lại mật khẩu</button>
      </div>
    </form>
  </div>
</template>

<script>
import { findEmployeeByEmployeeCode } from '~/models/employees.model';
import { forgotPass } from '~/models/user.model';
export default {
  data() {
    return {
      employeeCode: '',
      findEmployeeFail: false,
      employee: null,
    };
  },
  head: {
    title: 'Quên mật khẩu | Quản lí đào tạo',
  },
  methods: {
    async onSubmit() {
      try {
        this.employee = await findEmployeeByEmployeeCode(this.employeeCode);
        if (this.employee) {
          const email = {
            email: this.employee.email,
          };
          await forgotPass(email);
          await this.$router.push('/login');
          this.$toast.success('Nhà trường đã cấp lại mật khẩu cho bạn trong email tương ứng với mã nhân viên!');
          this.$toast.success('\tHãy kiểm tra hộp thư điện tử của bạn và đăng nhập lại');
        }
      } catch (error) {
        console.log(error);
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
  width: 350px !important;
  > .img {
    width: 200px;
    height: 200px;
    margin-bottom: 50px;
  }

  > .notification {
    width: 100%;
    text-align: center;
    margin: -30px 0 40px 0;
    font-family: 'Inter';
    font-size: 12px;
    font-weight: bold;
  }
  > .formfogotpass {
    > .form {
      position: relative;
      &.-text-right {
        text-align: right;
      }
    }
  }
  > .formfogotpass > .form > .input {
    background-color: var(--color-gray-base);
    width: 90%;
    height: 40px;
    padding: 5px 5px 5px 30px;
    border-radius: 10px;
  }
  > .formfogotpass > .form > .icon {
    position: absolute;
    top: 33%;
    left: 2%;
    font-size: 16px;
  }
  > .formfogotpass > .form > .button {
    color: var(--color-white);
    margin-top: 40px;
    background: #2c3383;
    border-radius: 17px;
    height: 50px;
    width: 60%;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
