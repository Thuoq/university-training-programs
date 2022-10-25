<template>
  <div class="academicYear-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã khóa</label>
        <app-input v-model="$v.code.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã khóa không được để trống!</div>
      <div v-if="!$v.code.minLength" class="notification">Mã khóa phải có tối thiểu từ 2 kí tự trở lên!</div>

      <div class="inputgroup">
        <label class="label">Tên khóa</label>
        <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên khóa không được để trống!</div>
      <div v-if="!$v.name.minLength" class="notification">Tên khóa phải có tối thiểu từ 4 kí tự trở lên!</div>

      <div class="inputgroup">
        <label class="label">Năm bắt đầu</label>
        <app-input v-model="$v.startYear.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.startYear.$error && !$v.startYear.required" class="notification">
        Năm bắt đầu không được để trống!
      </div>
      <div v-if="!$v.startYear.numeric" class="notification">Năm bắt đầu phải là số!</div>
      <div v-if="$v.startYear.$error && !$v.startYear.minLength" class="notification">
        Năm bắt đầu phải có 1 số có 4 chữ số trở lên!
      </div>
      <div v-if="$v.startYear.$error && !$v.startYear.between" class="notification">
        Năm bắt đầu trong khoảng từ {{ $v.startYear.$params.between.min }} đến {{ $v.startYear.$params.between.max }}!
      </div>

      <div class="inputgroup">
        <label class="label">Năm kết thúc</label>
        <app-input v-model="$v.finishYear.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.finishYear.$error && !$v.finishYear.required" class="notification">
        Năm kết thúc không được để trống!
      </div>
      <div v-if="!$v.finishYear.numeric" class="notification">Năm kết thúc phải là số!</div>
      <div v-if="$v.finishYear.$error && !$v.finishYear.minLength" class="notification">
        Năm kết thúc phải có 1 số có 4 chữ số trở lên!
      </div>
      <div v-if="!$v.finishYear.between" class="notification">
        Năm kết thúc trong khoảng từ {{ $v.finishYear.$params.between.min }} đến
        {{ $v.finishYear.$params.between.max }}!
      </div>
    </div>

    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
import { required, numeric, minLength, between } from 'vuelidate/lib/validators';
export default {
  props: {
    isEdit: {
      type: Boolean,
    },
    currentAcademicYear: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
      name: this.currentAcademicYear?.name || null,
      code: this.currentAcademicYear?.code || null,
      startYear: this.currentAcademicYear?.startYear.split('-')[0] || null,
      finishYear: this.currentAcademicYear?.finishYear.split('-')[0] || null,
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
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      if (this.isEdit === true) {
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
      margin-top: -20px;
      margin-bottom: 20px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin: 30px 50px 0px 50px;
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
