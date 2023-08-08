<template>
  <div class="subject-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="grouptext">
        <div class="group">
          <app-input-v2
            v-model="code"
            type="text"
            class="inputgroup"
            label="Mã học phần"
            :error="$v.code.$error"
            :error-messages="$validationError.code"
            required
            @input="$v.code.$touch()"
            @blur="$v.code.$touch()"
          >
          </app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model="name"
            type="text"
            required
            label="Tên học phần"
            :error="$v.name.$error"
            :error-messages="$validationError.name"
            class="inputgroup"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model="numberOfCredits"
            type="text"
            required
            :error="$v.numberOfCredits.$error"
            :error-messages="$validationError.numberOfCredits"
            label="Số tín chỉ"
            class="inputgroup"
            @input="$v.numberOfCredits.$touch()"
            @blur="$v.numberOfCredits.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model="numberOfTeachingHours"
            type="text"
            required
            :error="$v.numberOfTeachingHours.$error"
            :error-messages="$validationError.numberOfTeachingHours"
            label="Số giờ học"
            class="inputgroup"
            @input="$v.numberOfTeachingHours.$touch()"
            @blur="$v.numberOfTeachingHours.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model="coefficient"
            type="text"
            required
            :error="$v.coefficient.$error"
            :error-messages="$validationError.coefficient"
            label="Hệ số"
            class="inputgroup"
            @input="$v.coefficient.$touch()"
            @blur="$v.coefficient.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model.number="numberPrerequisiteCredits"
            type="text"
            :error="$v.numberPrerequisiteCredits.$error"
            :error-messages="$validationError.numberPrerequisiteCredits"
            label="Số TCTQ"
            class="inputgroup"
            @input="$v.numberPrerequisiteCredits.$touch()"
            @blur="$v.numberPrerequisiteCredits.$touch()"
          >
          </app-input-v2>
        </div>
      </div>
      <div class="mutilselect">
        <div class="wrapper">
          <label class="label">Học phần TQ</label>
        </div>
        <multiselect
          v-model="prerequisiteSubjectsId"
          :options="subjectsFilter"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :show-labels="false"
          label="code"
          track-by="code"
          placeholder="Chọn học phần tiên quyết"
          class="list"
        ></multiselect>
      </div>
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
import Multiselect from 'vue-multiselect';
import { required, numeric, minLength, decimal } from 'vuelidate/lib/validators';
export default {
  components: {
    Multiselect,
  },
  props: {
    subjects: {
      type: Array,
      default: () => [],
    },
    currentSubject: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentSubject?.name || null,
      code: this.currentSubject?.code || null,
      numberOfCredits: this.currentSubject?.numberOfCredits || null,
      numberPrerequisiteCredits: this.currentSubject?.numberPrerequisiteCredits || null,
      numberOfTeachingHours: this.currentSubject?.numberOfTeachingHours || null,
      coefficient: this.currentSubject?.coefficient || null,
      prerequisiteSubjectsId: this.currentSubject?.prerequisiteSubjects || null,
    };
  },
  computed: {
    isEdit() {
      return !!this.currentSubject?.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
    subjectsFilter() {
      if (this.isEdit) {
        return this.subjects.filter((subject) => subject.id !== this.currentSubject.id);
      }
      return this.subjects;
    },
  },
  errorTextValidator: {
    code: {
      required: 'Mã học phần không được để trống!',
      minLength: 'Mã học phần phải có tối thiểu từ 4 kí tự trở lên!',
    },
    name: {
      required: 'Tên học phần không được để trống!',
      minLength: 'Tên học phần phải có tối thiểu từ 4 kí tự trở lên!',
    },
    numberOfCredits: {
      required: 'Số tín chỉ không được để trống!',
      numeric: 'Số tín chỉ phải là số!',
    },
    numberOfTeachingHours: {
      required: 'Số giờ học không được để trống!',
      numeric: 'Số giờ học phải là số!',
    },
    coefficient: {
      required: 'Hệ số không được để trống!',
      decimal: 'Hệ số phải là số!',
    },
    numberPrerequisiteCredits: {
      numeric: 'Số tín chỉ tiên quyết phải là số!',
    },
  },
  validations() {
    return {
      code: {
        required,
        minLength: minLength(4),
      },
      name: {
        required,
        minLength: minLength(4),
      },
      numberOfCredits: {
        required,
        numeric,
      },
      numberOfTeachingHours: {
        required,
        numeric,
      },
      numberPrerequisiteCredits: {
        numeric,
      },
      coefficient: {
        required,
        decimal,
      },
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const subject = {
        name: this.name,
        numberOfCredits: this.numberOfCredits,
        numberPrerequisiteCredits: this.numberPrerequisiteCredits,
        numberOfTeachingHours: this.numberOfTeachingHours,
        code: this.code,
        coefficient: Number(this.coefficient),
        prerequisiteSubjectsId: !this.prerequisiteSubjectsId
          ? []
          : this.prerequisiteSubjectsId.map((subject) => ({ id: subject.id })),
      };
      if (this.isEdit === true) {
        subject.id = this.currentSubject.id;
      }
      const payload = subject;
      this.$emit('submit', payload);
      this.$emit('closed');
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentSubject.id,
      });
      this.$emit('closed');
    },
  },
};
</script>
<style lang="scss">
.subject-dialog {
  @import './vue-multiselect.min.scss';
  --mdc-dialog-min-width: 850px;
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
    > .grouptext {
      display: flex;
      margin-top: 30px;
      flex-wrap: wrap;
      justify-content: space-between;
      > .group {
        width: 380px;
        text-align: left;
        margin-bottom: 26px;
        > .inputgroup {
          width: 380px;
        }
      }
    }
    > .mutilselect {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0px 30px 0px;
      font-size: 14px;
      > .wrapper {
        display: flex;
        align-items: center;
        column-gap: 2px;
      }
      > .wrapper > .label {
        font-family: 'Inter', serif;
        color: var(--color-back);
        text-align: left;
      }
      > .list {
        width: 84.5%;
      }
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
