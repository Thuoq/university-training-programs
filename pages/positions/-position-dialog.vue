<template>
  <div class="position-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã nhóm người dùng</label>
        <app-input v-model="code" type="text" class="input" required></app-input>
      </div>
      <div class="notification">
        <p v-if="checkEmptyCode === true">Mã nhóm người dùng không được để trống!</p>
        <p v-if="checkDuplicateCode === true">Mã nhóm người dùng này đã tồn tại!</p>
      </div>
      <div class="inputgroup">
        <label class="label">Tên nhóm người dùng</label>
        <app-input v-model="name" type="text" class="input" required></app-input>
      </div>
      <div class="notification">
        <p v-if="checkEmptyName === true">Tên nhóm người dùng không được để trống!</p>
        <p v-if="checkDuplicateName === true">Tên nhóm người dùng này đã tồn tại!</p>
      </div>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    positions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: null,
      code: null,
      checkDuplicateName: false,
      checkDuplicateCode: false,
      checkEmptyCode: false,
      checkEmptyName: false,
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const checkNull = (value) => {
        if (!value) return true;
        else return false;
      };

      // checkEmpty
      this.checkEmptyCode = checkNull(this.code);
      this.checkEmptyName = checkNull(this.name);

      //  checkDuplicate
      this.checkDuplicateCode = this.positions.some((element) => {
        if (element.code === this.code) {
          return true;
        }
        return false;
      });
      this.checkDuplicateName = this.positions.some((element) => {
        if (element.name === this.name) {
          return true;
        }
        return false;
      });

      if (
        this.checkDuplicateCode === false &&
        this.checkDuplicateName === false &&
        this.checkEmptyCode === false &&
        this.checkEmptyName === false
      ) {
        const position = {
          name: this.name,
          code: this.code,
        };
        const payload = position;
        this.$emit('submit', payload);
        this.$emit('closed');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.position-dialog {
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
    text-align: center;
    margin: 23px 0px 23px 0px;
    > .inputgroup {
      position: relative;
      display: inline-block;
    }
    > .inputgroup:not(:last-child) {
      margin-bottom: 23.13px;
    }

    > .notification {
      color: red;
      text-align: center;
      font-size: 15px;
      font-family: 'Inter';
      margin-top: -16px;
      margin-bottom: 10px;
    }
  }

  > .body > .inputgroup > .input {
    background-color: var(--color-white);
    border: 1px solid black;
    width: 250px;
    height: 40px;
    border-radius: 5px;
  }

  > .body > .inputgroup > .label {
    margin-right: 10px;
    width: 200px;
    text-align: right;
    margin-top: 10px;
    font-size: 16px;
    font-weight: 400;
    font-family: 'Inter';
    color: var(--color-back);
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
