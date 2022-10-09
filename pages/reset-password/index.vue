<template>
  <div>
    <layout-title :title="title"></layout-title>
    <div class="container">
      <form class="form_reset_pass" @submit.prevent="onSubmit">
        <p v-if="checkCurrentPass === false" class="notification">Mật khẩu cũ không đúng</p>
        <p v-if="checkNewPassEqual === false" class="notification">
          Mật khẩu mới và xác nhận mật khẩu mới không giống nhau
        </p>
        <div class="form">
          <label class="label">Mật khẩu cũ:</label>
          <input v-model="currentPass" class="input" type="password" required />
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
          <button class="button" type="submit">Đổi mật khẩu</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'Đổi mật khẩu',
      currentPass: null,
      newPass: null,
      newPassVerify: null,
      checkCurrentPass: true,
      checkNewPassEqual: true,
    };
  },
  methods: {
    onSubmit() {
      if (this.currentPass === '123') {
        if (this.newPass === this.newPassVerify) {
          console.log(this.newPass);
        } else {
          this.checkNewPassEqual = false;
        }
      } else {
        this.checkCurrentPass = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.container {
  background-color: var(--color-white);
  text-align: center;
  > .form_reset_pass {
    margin: 90px auto;
    > .form {
      position: relative;
    }

    > .form:not(:last-child) {
      margin-bottom: 20px;
    }

    > .notification {
      font-size: 15px;
      font-weight: 400;
      font-family: 'Arial';
      color: red;
      margin-bottom: 20px;
    }
  }

  > .form_reset_pass > .form > .input {
    background-color: var(--color-white);
    border: 1px solid black;
    width: 353px;
    height: 40px;
  }

  > .form_reset_pass > .form > label {
    margin-right: 10px;
    display: inline-block;
    width: 200px;
    text-align: right;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter';
  }

  > .form_reset_pass > .form > .button {
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
