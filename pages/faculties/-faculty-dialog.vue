<template>
  <div class="facultie-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <app-input-v2
        v-model="code"
        :error="$v.code.$error"
        :error-messages="$validationError.code"
        type="text"
        required
        class="inputgroup"
        label="Mã Khoa"
        @input="$v.code.$touch()"
        @blur="$v.code.$touch()"
      ></app-input-v2>

      <app-input-v2
        v-model="name"
        type="text"
        required
        :error="$v.name.$error"
        :error-messages="$validationError.name"
        class="inputgroup"
        label="Tên Khoa"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></app-input-v2>
    </div>
    <div class="footer">
      <div class="cancel">
        <app-button v-if="isEdit" raised class="btn -delete" @click="onDelete">Xoá</app-button>
      </div>
      <div class="submit">
        <app-button raised class="btn -close" @click="onClosed">Huỷ</app-button>
        <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
    currentFaculty: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentFaculty?.name || null,
      code: this.currentFaculty?.code || null,
    };
  },
  computed: {
    isEdit() {
      return !!this.currentFaculty.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
  },
  validations: {
    code: {
      required,
      minLength: minLength(2),
    },
    name: {
      required,
      minLength: minLength(4),
    },
  },
  errorTextValidator: {
    code: {
      required: 'Mã khoa không được để trống!',
      minLength: 'Mã khoa phải có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên khoa không được để trống!',
      minLength: 'Tên khoa phải có tối thiểu từ 4 kí tự trở lên!',
    },
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
    onDelete() {
      this.$emit('delete', {
        id: this.currentFaculty.id,
      });
      this.$emit('closed');
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
      margin-bottom: 37px;
    }
    > .inputgroup:not(:last-child) {
      margin-bottom: 23.13px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.app-button {
  &.-save {
    --mdc-theme-primary: var(--color-primary);
  }
  &.-close {
    --mdc-theme-primary: var(--color-gray-base);
    --mdc-theme-on-primary: var(--color-back);
  }
  &.-delete {
    --mdc-theme-primary: var(--color-error);
    --mdc-theme-on-primary: var(--color-white);
  }
}
</style>
