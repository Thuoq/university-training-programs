<template>
  <div class="major-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Khoa</label>
        <app-select
          v-model="$v.facultyId.$model"
          :model-value="facultyId"
          :value="facultyId"
          :value-prop="'id'"
          :label-prop="'name'"
          :items="faculties"
          @change="onChange($event)"
        ></app-select>
      </div>
      <div v-if="!$v.facultyId.required && $v.facultyId.$error" class="notification">Khoa không được để trống!</div>

      <div class="inputgroup">
        <label class="label">Bộ môn</label>
        <app-select
          v-model="$v.sectionId.$model"
          :model-value="sectionId"
          :value="sectionId"
          :value-prop="'id'"
          :label-prop="'name'"
          :items="getSection"
        ></app-select>
      </div>
      <div v-if="!$v.sectionId.required" class="notification">Bộ môn không được để trống!</div>

      <div class="inputgroup">
        <label class="label">Mã ngành học</label>
        <app-input v-model="$v.code.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã ngành học không được để trống!</div>
      <div v-if="!$v.code.minLength" class="notification">Mã ngành học phải có tối thiểu từ 2 kí tự trở lên!</div>

      <div class="inputgroup">
        <label class="label">Tên ngành học</label>
        <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
      </div>
      <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên ngành học không được để trống!</div>
      <div v-if="!$v.name.minLength" class="notification">Tên ngành học phải có tối thiểu từ 4 kí tự trở lên!</div>
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
    faculties: {
      type: Array,
      default: () => [],
    },
    sections: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
    },
    currentMajor: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      name: this.currentMajor?.name || null,
      code: this.currentMajor?.code || null,
      facultyId: this.currentMajor?.facultyId || null,
      sectionId: this.currentMajor?.sectionId || null,
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
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
  computed: {
    getSection() {
      return this.facultyId !== null
        ? this.sections.filter((element) => {
            return element.facultyId === this.facultyId;
          })
        : this.sections;
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
      if (this.sectionId) {
        let findIndex = null;
        this.sections.forEach((e) => {
          if (e.id === this.sectionId) {
            findIndex = e;
          }
        });
        if (findIndex.facultyId !== faculty.id) {
          this.sectionId = null;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.major-dialog {
  --app-select-height: 32px;
  --app-select-width: 227px;
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
    margin: 50px 50px 0px 50px;
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
