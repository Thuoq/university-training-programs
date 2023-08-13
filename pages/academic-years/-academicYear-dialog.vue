<template>
  <div class="academicYear-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <app-input-v2
        v-model="code"
        :error="$v.code.$error"
        :error-messages="$validationError.code"
        type="text"
        required
        class="inputgroup"
        label="Mã Khoá"
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
        label="Tên Khoá"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></app-input-v2>
      <app-input-v2
        v-model="startYear"
        type="text"
        required
        :error="$v.startYear.$error"
        :error-messages="$validationError.startYear"
        class="inputgroup"
        label="Năm bắt đầu"
        @input="$v.startYear.$touch()"
        @blur="$v.startYear.$touch()"
      ></app-input-v2>
      <app-input-v2
        v-model="finishYear"
        type="text"
        required
        :error="$v.finishYear.$error"
        :error-messages="$validationError.finishYear"
        class="inputgroup"
        label="Năm kết thúc"
        @input="$v.finishYear.$touch()"
        @blur="$v.finishYear.$touch()"
      ></app-input-v2>
    </div>

    <div class="footer">
      <div class="cancel">
        <app-button
          v-if="isEdit"
          :disabled="!currentAcademicYear.canDelete"
          raised
          class="btn -delete"
          @click="onDelete"
          >Xoá</app-button
        >
      </div>
      <div class="submit">
        <app-button raised class="btn -close" @click="onClosed">Huỷ</app-button>
        <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, numeric, minLength, between } from 'vuelidate/lib/validators';
export default {
  props: {
    currentAcademicYear: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentAcademicYear?.name || null,
      code: this.currentAcademicYear?.code || null,
      startYear: this.currentAcademicYear?.startYear?.split('-')[0] || null,
      finishYear: this.currentAcademicYear?.finishYear?.split('-')[0] || null,
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
      startYear: {
        required,
        numeric,
        mixLength: minLength(4),
        between: between(2000, !this.finishYear ? 2100 : this.finishYear),
      },
      finishYear: {
        required,
        numeric,
        mixLength: minLength(4),
        between: between(!this.startYear ? 2000 : Number(this.startYear) + 1, 2100),
      },
    };
  },
  computed: {
    isEdit() {
      return this.currentAcademicYear?.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
  },
  errorTextValidator: {
    code: {
      required: 'Mã khóa không được để trống!',
      minLength: 'Mã khóa phải có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên khóa không được để trống!',
      minLength: 'Tên khóa phải có tối thiểu từ 4 kí tự trở lên!',
    },
    startYear: {
      required: ' Năm bắt đầu không được để trống!',
      numeric: 'Năm bắt đầu phải là số!',
      mixLength: ' Năm bắt đầu phải có 1 số có 4 chữ số trở lên!',
      between: `Năm bắt đầu phải nằm trong khoảng 2000-2100`,
    },
    finishYear: {
      required: ' Năm kết thúc không được để trống!',
      numeric: 'Năm kết thúc phải là số!',
      mixLength: ' Năm kết thúc phải có 1 số có 4 chữ số trở lên!',
      between: `Năm kết thúc  nằm trong khoảng 2000-2100 và phải lớn hơn năm bắt đầu`,
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      if (this.isEdit) {
        const editAcademicYear = {
          name: this.name,
          code: this.code,
          startYear: new Date(`01-02-${this.startYear}`),
          finishYear: new Date(`01-02-${this.finishYear}`),
          id: this.currentAcademicYear.id,
        };
        const payload = editAcademicYear;
        this.$emit('submit', payload);
        this.$emit('closed');
      } else {
        const academicYear = {
          name: this.name,
          code: this.code,
          startYear: new Date(`01-02-${this.startYear}`),
          finishYear: new Date(`01-02-${this.finishYear}`),
        };
        const payload = academicYear;
        this.$emit('submit', payload);
        this.$emit('closed');
      }
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentAcademicYear.id,
      });
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.academicYear-dialog {
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
