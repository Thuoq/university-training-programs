<template>
  <div class="facultie-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã khoa</label>
        <app-input v-model="code" class="input" type="text" required></app-input>
      </div>
      <div class="inputgroup">
        <label class="label">Tên khoa</label>
        <app-input v-model="name" class="input" type="text" required></app-input>
      </div>
    </div>
    <div v-if="checkDuplicateCode === true" class="notification">Mã khoa này đã tồn tại !</div>
    <div v-if="checkDuplicateName === true" class="notification">Tên khoa này đã tồn tại !</div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    faculties: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: null,
      code: null,
      checkDuplicateCode: false,
      checkDuplicateName: false,
    };
  },
  created() {
    console.log(this.faculties);
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      this.checkDuplicateCode = this.faculties.some((element) => {
        if (element.code === this.code) {
          return true;
        }
        return false;
      });

      this.checkDuplicateName = this.faculties.some((element) => {
        if (element.name === this.name) {
          return true;
        }
        return false;
      });

      if (this.checkDuplicateCode === false && this.checkDuplicateName === false) {
        const faculty = {
          code: this.code,
          name: this.name,
        };

        const payload = faculty;
        this.$emit('submit', payload);
        this.$emit('closed');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.facultie-dialog {
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

  .notification {
    font-size: 15px;
    color: red;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
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
