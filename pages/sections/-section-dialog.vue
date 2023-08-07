<template>
  <div class="faculty-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <app-select-v2
        v-model="$v.facultyId.$model"
        :model-value="facultyId"
        :value="facultyId"
        value-prop="id"
        label-prop="name"
        :items="faculties"
        :error-messages="$validationError.facultyId"
        :error="$v.facultyId.$error"
        class="inputgroup"
        required
        label="Khoa"
        @input="$v.facultyId.$touch()"
        @blur="$v.facultyId.$touch()"
      >
      </app-select-v2>

      <app-input-v2
        v-model="$v.code.$model"
        type="text"
        class="inputgroup"
        required
        label="Mã bộ môn"
        :error-messages="$validationError.code"
        :error="$v.code.$error"
        @input="$v.code.$touch()"
        @blur="$v.code.$touch()"
      >
      </app-input-v2>

      <app-input-v2
        v-model="name"
        type="text"
        class="inputgroup"
        required
        label="Tên bộ môn"
        :error-messages="$validationError.name"
        :error="$v.name.$error"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </app-input-v2>
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
    faculties: {
      type: Array,
      default: () => [],
    },
    currentSection: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: this.currentSection?.name || null,
      code: this.currentSection?.code || null,
      facultyId: this.currentSection?.facultyId || null,
    };
  },
  computed: {
    isEdit() {
      return !!this.currentSection?.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
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
        minLength: minLength(2),
      },
      facultyId: {
        required,
      },
    };
  },
  errorTextValidator: {
    code: {
      required: 'Mã bộ môn không được để trống!',
      minLength: 'Mã bộ môn phải có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên bộ môn không được để trống!',
      minLength: 'Tên bộ môn phải có tối thiểu từ 2 kí tự trở lên!',
    },
    facultyId: {
      required: 'Khoa không được để trống!',
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      if (this.isEdit === true) {
        const editSection = {
          name: this.name,
          code: this.code,
          facultyId: this.facultyId,
          id: this.currentSection.id,
        };
        const payload = editSection;
        this.$emit('submit', payload);
        this.$emit('closed');
      } else {
        const section = {
          name: this.name,
          code: this.code,
          facultyId: this.facultyId,
        };
        const payload = section;
        this.$emit('submit', payload);
        this.$emit('closed');
      }
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentSection.id,
      });
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.faculty-dialog {
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
