<template>
  <div class="employee-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="grouptext">
        <div class="group">
          <div class="inputgroup">
            <label class="label">Mã CTDT</label>
            <app-input v-model="$v.code.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.code.$error && !$v.code.required" class="notification">Mã CTĐT không được để trống!</div>
          <div v-if="!$v.code.minLength" class="notification">Mã CTĐT phải có tối thiểu từ 2 kí tự trở lên!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Tên CTDT</label>
            <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
          </div>
          <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên CTĐT không được để trống!</div>
          <div v-if="!$v.name.minLength" class="notification">Tên CTĐT phải có tối thiểu từ 4 kí tự trở lên!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Khóa</label>
            <app-select
              v-model="$v.academicYearId.$model"
              :model-value="academicYearId"
              :value="academicYearId"
              :value-prop="'id'"
              :label-prop="'name'"
              :items="academicYears"
            ></app-select>
          </div>
          <div v-if="!$v.academicYearId.required" class="notification">Khóa không được để trống!</div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Ngành</label>
            <app-select
              v-model="$v.marjorId.$model"
              :model-value="marjorId"
              :value="marjorId"
              :value-prop="'id'"
              :label-prop="'name'"
              :items="majors"
            ></app-select>
          </div>
          <div v-if="!$v.marjorId.required" class="notification">Ngành không được để trống!</div>
        </div>
      </div>
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
    majors: {
      type: Array,
      default: () => [],
    },
    academicYears: {
      type: Array,
      default: () => [],
    },
    currentTrainingProgram: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
      name: this.currentTrainingProgram?.name || null,
      code: this.currentTrainingProgram?.code || null,
      marjorId: this.currentTrainingProgram?.marjorId || null,
      academicYearId: this.currentTrainingProgram?.academicYearId || null,
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
      marjorId: {
        required,
      },
      academicYearId: {
        required,
      },
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const TP = {
        name: this.name,
        marjorId: this.marjorId,
        academicYearId: this.academicYearId,
      };
      if(this.isEdit===true){
        TP.id = this.currentTrainingProgram.id;
      }
      const payload = TP;
      this.$emit('submit', payload);
      this.$emit('closed');
    },
  },
};
</script>
<style lang="scss" scoped>
.employee-dialog {
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
