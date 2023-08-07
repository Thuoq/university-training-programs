<template>
  <div class="position-dialog">
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
    currentPosition: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentPosition?.name || null,
      code: this.currentPosition?.code || null,
    };
  },
  computed: {
    isEdit() {
      return !!this.currentPosition.id;
    },
    title() {
      return this.isEdit ? 'Chỉnh sửa' : 'Thêm mới';
    },
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
  errorTextValidator: {
    code: {
      required: 'Mã nhóm người dùng không được để trống!',
      minLength: 'Mã nhóm người dùng có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên nhóm người dùng không được để trống!',
      minLength: 'Tên nhóm người dùng phải có tối thiểu từ 4 kí tự trở lên!',
    },
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
      if (this.isEdit) {
        position.id = this.currentPosition.id;
      }
      const payload = position;
      this.$emit('submit', payload);
      this.$emit('closed');
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentPosition.id,
      });
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
      margin-bottom: 37px;
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
