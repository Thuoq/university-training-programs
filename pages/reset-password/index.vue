<template>
  <div>
    <layout-title :title="title"></layout-title>
    <div class="container">
      <form v-if="checkSuccess === false" class="formresetpass" @submit.prevent="onSubmit">
        <div class="form">
          <label class="label">Mật khẩu cũ:</label>
          <input v-model="oldPass" class="input" type="password" required />
        </div>
        <div class="form">
          <label class="label">Mật khẩu mới:</label>
          <input v-model="newPass" class="input" type="password" required />
        </div>
        <div class="form">
          <label class="label">Xác nhận mật khẩu mới:</label>
          <input v-model="newPassVerify" class="input" type="password" required />
        </div>
        <div class="form">
          <p v-if="checkOldPass === false" class="notification">Mật khẩu cũ của bạn không chính xác!</p>
          <p v-if="checkNewPassEqual === false" class="notification">
            Mật khẩu mới và xác nhận mật khẩu mới không khớp nhau!
          </p>
        </div>
        <div class="form">
          <button class="button" type="submit">Đổi mật khẩu</button>
        </div>
      </form>
      <div v-if="checkSuccess === true" class="success">
        Đổi mật khẩu thành công!
        <br />
        <br />
        Mật khẩu của bạn đã được cập nhật
      </div>
    </div>
  </div>
</template>
<script>
import { pathified } from '~/utils';
const { $dispatch, $get } = pathified('user');
export default {
  data() {
    return {
      title: 'Đổi mật khẩu',
      oldPass: null,
      newPass: null,
      newPassVerify: null,
      checkOldPass: true,
      checkNewPassEqual: true,
      checkSuccess: false,
    };
  },
  computed: {
    currentUser: $get('currentUser'),
  },
  methods: {
    async onSubmit() {
      if (this.newPass === this.newPassVerify) {
        this.checkNewPassEqual = true;
        this.checkOldPass = true;
        const userPass = {
          oldPassword: this.oldPass,
          newPassword: this.newPass,
        };
        const oldPass = this.currentUser.password;
        await $dispatch('resetPass', userPass);
        const newPass = this.currentUser.password;
        if (oldPass === newPass) {
          this.checkOldPass = false;
        } else {
          this.checkSuccess = true;
        }
      } else {
        this.checkNewPassEqual = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background-color: var(--color-white);
  text-align: center;
  > .formresetpass {
    margin: 90px auto;
    > .form {
      position: relative;
    }

    > .form:not(:last-child) {
      margin-bottom: 20px;
    }
  }

  > .success {
    font-family: 'Inter';
    font-size: 15px;
    margin-top: 105px;
  }

  > .formresetpass > .form > .input {
    background-color: var(--color-white);
    border: 1px solid black;
    width: 353px;
    height: 40px;
  }

  > .formresetpass > .form > .notification {
    font-size: 15px;
    font-weight: 700;
    font-family: 'Inter';
    color: red;
  }

  > .formresetpass > .form > label {
    margin-right: 10px;
    display: inline-block;
    width: 200px;
    text-align: right;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter';
  }

  > .formresetpass > .form > .button {
    background: rgba($color: #d9d9d9, $alpha: 0.3);
    border: 1px solid black;
    border-radius: 17px;
    height: 40px;
    width: 149px;
    margin-top: 40px;
    margin-left: 70px;
    cursor: pointer;
  }
}
</style>
