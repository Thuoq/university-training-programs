<template>
  <div class="employee-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="grouptext">
        <div class="group">
          <app-input-v2
            v-model="code"
            :error="$v.code.$error"
            :error-messages="$validationError.code"
            type="text"
            required
            class="inputgroup"
            label="Mã CTĐT"
            @input="$v.code.$touch()"
            @blur="$v.code.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-input-v2
            v-model="name"
            type="text"
            required
            :error="$v.name.$error"
            :error-messages="$validationError.name"
            class="inputgroup"
            label="Tên CTĐT"
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          ></app-input-v2>
        </div>

        <div class="group">
          <app-select-v2
            v-model="academicYearId"
            required
            label="Khóa"
            class="inputgroup"
            :model-value="academicYearId"
            :value="academicYearId"
            value-prop="id"
            label-prop="name"
            :error="$v.academicYearId.$error"
            :error-messages="$validationError.academicYearId"
            :items="academicYears"
            @input="$v.academicYearId.$touch()"
            @blur="$v.academicYearId.$touch()"
          >
          </app-select-v2>
        </div>

        <div class="group">
          <app-select-v2
            v-model="marjorId"
            required
            label="Ngành"
            class="inputgroup"
            :model-value="marjorId"
            :value="marjorId"
            value-prop="id"
            label-prop="name"
            :error="$v.marjorId.$error"
            :error-messages="$validationError.marjorId"
            :items="majors"
            @input="$v.marjorId.$touch()"
            @blur="$v.marjorId.$touch()"
          >
          </app-select-v2>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="cancel">
        <app-button
          v-if="isEdit"
          :disabled="!currentTrainingProgram.canDelete"
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
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
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
      default: () => ({}),
    },
  },
  data() {
    return {
      name: this.currentTrainingProgram?.name || null,
      code: this.currentTrainingProgram?.code || null,
      marjorId: this.currentTrainingProgram?.marjorId || null,
      academicYearId: this.currentTrainingProgram?.academicYearId || null,
    };
  },
  computed: {
    isEdit() {
      return !!this.currentTrainingProgram.id;
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
  errorTextValidator: {
    code: {
      required: 'Mã CTĐT không được để trống!',
      minLength: 'Mã CTĐT phải có tối thiểu từ 2 kí tự trở lên!',
    },
    name: {
      required: 'Tên CTĐT không được để trống!',
      minLength: 'Tên CTĐT phải có tối thiểu từ 4 kí tự trở lên!',
    },
    academicYearId: {
      required: 'Khóa không được để trống!',
    },
    marjorId: {
      required: 'Ngành không được để trống!',
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const TP = {
        code: this.code,
        name: this.name,
        marjorId: this.marjorId,
        academicYearId: this.academicYearId,
      };
      if (this.isEdit) {
        TP.id = this.currentTrainingProgram.id;
      }
      const payload = TP;
      this.$emit('submit', payload);
      this.$emit('closed');
    },
    onDelete() {
      this.$emit('delete', {
        id: this.currentTrainingProgram.id,
      });
      this.$emit('closed');
    },
  },
};
</script>
<style lang="scss" scoped>
.employee-dialog {
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
