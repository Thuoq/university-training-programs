<template>
  <div class="facultie-dialog">
    <h2 class="title">{{title}}</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã khoa</label>
        <app-input v-model="$v.code.$model" class="input" type="text" required></app-input>
      </div>
      <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã khoa không được để trống!</div>
      <div v-if="!$v.code.minLength" class="notification">Mã khoa phải có tối thiểu từ 2 kí tự trở lên!</div>

      <div class="inputgroup">
        <label class="label">Tên khoa</label>
        <app-input v-model="$v.name.$model" class="input" type="text" required></app-input>
      </div>
      <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên khoa không được để trống!</div>
      <div v-if="!$v.name.minLength" class="notification">Tên khoa phải có tối thiểu từ 4 kí tự trở lên!</div>
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
    currentFaculty: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: this.currentFaculty?.name || null,
      code: this.currentFaculty?.code || null,
      title: !this.isEdit  ?'Thêm mới' : 'Chỉnh sửa'
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
      if (this.isEdit === true) {
        const currentfaculty = {
          code: this.code,
          name: this.name,
          id: this.currentFaculty.id,
        };
        const payload = currentfaculty;
        this.$emit('submit', payload);
        this.$emit('closed');
      } else {
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
    margin-top: 40px;
    > .inputgroup {
      width: 380px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 37px;
    }
    > .inputgroup:not(:last-child) {
      margin-bottom: 23.13px;
    }
  }

  > .body > .inputgroup > .input {
    height: 40px;
  }

  > .body > .inputgroup > .label {
    font-family: 'Inter';
    color: var(--color-back);
  }

  > .body > .notification {
    color: red;
    text-align: right;
    font-size: 15px;
    font-family: 'Inter';
    margin-top: 20px;
    margin-bottom: 20px;
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
