<template>
  <div class="position-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã nhóm người dùng</label>
        <app-input v-model="$v.code.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã nhóm người dùng không được để trống!</div>
      <div v-if="!$v.code.minLength" class="notification">Mã nhóm người dùng phải có tối thiểu từ 2 kí tự trở lên!</div>

      <div class="inputgroup">
        <label class="label">Tên nhóm người dùng</label>
        <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.name.$error && !$v.name.required" class="notification">
        Tên nhóm người dùng không được để trống!
      </div>
      <div v-if="!$v.name.minLength" class="notification">
        Tên nhóm người dùng phải có tối thiểu từ 4 kí tự trở lên!
      </div>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
    isEdit: {
      type: Boolean,
    },
    currentPosition: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: !this.currentPosition ? 'Thêm mới' : 'Chỉnh sửa',
      name: this.currentPosition?.name || null,
      code: this.currentPosition?.code || null,
    };
  },
  validations() {
    return {
      code: {
        required,
        minLength: minLength(2),
      },
      name: {
        required,
        minLength: minLength(4),
      },
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const position = {
        name: this.name,
        code: this.code,
      };
      if (this.isEdit === true) {
        position.id = this.currentPosition.id;
      }
      const payload = position;
      this.$emit('submit', payload);
      this.$emit('closed');
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
    margin-top: 40px;
    > .inputgroup {
      width: 450px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 37px;
    }

    > .inputgroup > .label {
      font-family: 'Inter';
      color: var(--color-back);
    }

    > .inputgroup > .input {
      height: 32px;
    }

    > .notification {
      color: red;
      text-align: right;
      font-size: 15px;
      font-family: 'Inter';
      margin-top: -17px;
      margin-bottom: 20px;
    }
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
