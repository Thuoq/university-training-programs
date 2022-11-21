<template>
  <div class="subject-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="grouptext">
        <div class="group">
          <div class="inputgroup">
            <label class="label">Mã học phần</label>
            <app-input v-model="$v.code.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã học phần không được để trống!</div>
          <div v-if="!$v.code.minLength" class="notification">Mã học phần phải có tối thiểu từ 2 kí tự trở lên!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Tên học phần</label>
            <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên học phần không được để trống!</div>
          <div v-if="!$v.name.minLength" class="notification">Mã học phần phải có tối thiểu từ 4 kí tự trở lên!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số tín chỉ</label>
            <app-input v-model.number="$v.numberOfCredits.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.numberOfCredits.$error && !$v.numberOfCredits.required" class="notification">
            Số tín chỉ không được để trống!
          </div>
          <div v-if="!$v.numberOfCredits.numeric" class="notification">Số tín chỉ phải là số!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số giờ học</label>
            <app-input v-model.number="$v.numberOfTeachingHours.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.numberOfTeachingHours.$error && !$v.numberOfTeachingHours.required" class="notification">
            Số giờ học không được để trống!
          </div>
          <div v-if="!$v.numberOfTeachingHours.numeric" class="notification">Số giờ học phải là số!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Hệ số</label>
            <app-input v-model.number="$v.coefficient.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.coefficient.$error && !$v.coefficient.required" class="notification">
            Hệ số không được để trống!
          </div>
          <div v-if="!$v.coefficient.decimal" class="notification">Hệ số phải là số!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số tín chỉ tiên quyết</label>
            <app-input v-model.number="$v.numberPrerequisiteCredits.$model" type="text" class="input"></app-input>
          </div>
          <div v-if="!$v.numberPrerequisiteCredits.numeric" class="notification">Số tín chỉ tiên quyết phải là số!</div>
        </div>
      </div>
      <div class="mutilselect">
        <label class="label">Học phần tiên quyết</label>
        <multiselect
          v-model="prerequisiteSubjectsId"
          :options="subjects"
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
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
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
    isEdit: {
      type: Boolean,
    },
    currentSubject: {
      type: Object,
      default: () => {},
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
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
    };
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
  },
};
</script>
<style lang="scss">
.subject-dialog {
  @import './vue-multiselect.min.scss';
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
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      > .group > .inputgroup > .label {
        font-family: 'Inter';
        color: var(--color-back);
      }
      > .group > .inputgroup > .input {
        height: 32px;
      }
      > .group > .notification {
        color: red;
        text-align: left;
        font-size: 15px;
        font-family: 'Inter';
        margin-top: 16px;
        margin-bottom: 10px;
      }
    }
    > .mutilselect {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 10px 0px 30px 0px;
      > .label {
        font-family: 'Inter';
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
