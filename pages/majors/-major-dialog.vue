<template>
  <div class="major-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <app-select-v2
        v-model="facultyId"
        :model-value="facultyId"
        value-prop="id"
        label-prop="name"
        required
        :error-messages="$validationError.facultyId"
        :error="$v.facultyId.$error"
        :items="faculties"
        label="Khoa"
        class="inputgroup"
        @change="onChange($event)"
        @input="$v.facultyId.$touch()"
        @blur="$v.facultyId.$touch()"
      >
      </app-select-v2>

      <app-select-v2
        v-model="sectionId"
        required
        value-prop="id"
        label="Bộ môn"
        label-prop="name"
        :items="sectionsFilter"
        class="inputgroup"
        :error-messages="$validationError.sectionId"
        :error="$v.sectionId.$error"
      >
      </app-select-v2>
      <app-input-v2
        v-model="$v.code.$model"
        type="text"
        class="inputgroup"
        required
        label="Mã ngành học"
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
        label="Tên ngành học"
        :error-messages="$validationError.name"
        :error="$v.name.$error"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </app-input-v2>
      <div class="footer">
        <div class="cancel">
          <app-button v-if="isEdit" :disabled="!currentMajor.canDelete" raised class="btn -delete" @click="onDelete"
            >Xoá</app-button
          >
        </div>
        <div class="submit">
          <app-button raised class="btn -close" @click="onClosed">Huỷ</app-button>
          <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
        </div>
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
    sections: {
      type: Array,
      default: () => [],
    },
    currentMajor: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentMajor?.name || null,
      code: this.currentMajor?.code || null,
      facultyId: this.currentMajor?.facultyId || null,
      sectionId: this.currentMajor?.sectionId || null,
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
      facultyId: {
        required,
      },
      sectionId: {
        required,
      },
    };
  },
  errorTextValidator: {
    code: {
      required: 'Mã ngành học không được để trống!',
      minLength: 'Mã ngành học phải có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên ngành học không được để trống!',
      minLength: 'Tên ngành học phải có tối thiểu từ 4 kí tự trở lên!',
    },
    facultyId: {
      required: 'Khoa không được để trống!',
    },
    sectionId: {
      required: 'Bộ môn không được để trống!',
    },
  },
  computed: {
    sectionsFilter() {
      return this.facultyId !== null
        ? this.sections.filter((element) => {
            return element.facultyId === this.facultyId;
          })
        : this.sections;
    },
    isEdit() {
      return !!this.currentMajor?.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      if (this.isEdit === true) {
        const editMajor = {
          name: this.name,
          code: this.code,
          facultyId: this.facultyId,
          sectionId: this.sectionId,
          id: this.currentMajor.id,
        };
        const payload = editMajor;
        this.$emit('submit', payload);
        this.$emit('closed');
      } else {
        const major = {
          name: this.name,
          code: this.code,
          facultyId: this.facultyId,
          sectionId: this.sectionId,
        };
        const payload = major;
        this.$emit('submit', payload);
        this.$emit('closed');
      }
    },
    onChange(faculty) {
      if (this.sectionId && this.sections.length) {
        let findIndex = null;
        this.sections.forEach((e) => {
          if (e.id === this.sectionId) {
            findIndex = e;
          }
        });
        if (findIndex?.facultyId !== faculty.id) {
          this.sectionId = null;
        }
      }
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentMajor.id,
      });
      this.$emit('closed');
    },
  },
};
</script>

<style lang="scss" scoped>
.major-dialog {
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
