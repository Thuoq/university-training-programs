<template>
  <div class="employee-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <div class="group">
        <div class="inputgroup">
          <label class="label">Mã đăng nhập</label>
          <app-input v-model="$v.employeeCode.$model" type="text" class="input" required></app-input>
        </div>
        <div v-if="$v.employeeCode.$error && !$v.employeeCode.required" class="notification">
          Mã đăng nhập không được để trống!
        </div>
        <div v-if="!$v.employeeCode.minLength" class="notification">
          Mã đăng nhập phải có tối thiểu từ 3 kí tự trở lên!
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Tên người dùng</label>
          <app-input v-model="$v.name.$model" type="text" class="input" required></app-input>
        </div>
        <div v-if="$v.name.$error && !$v.name.required" class="notification">Tên người dùng không được để trống!</div>
        <div v-if="!$v.name.minLength" class="notification">Tên người dùng phải có tối thiểu từ 4 kí tự trở lên!</div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Email</label>
          <app-input v-model="$v.email.$model" type="text" class="input" required></app-input>
        </div>
        <div v-if="$v.email.$error && !$v.email.required" class="notification">Email không được để trống!</div>
        <div v-if="!$v.email.email" class="notification">Email phải có định dang là 1 email ví dụ: test@gmail.com!</div>
      </div>

      <div class="group" v-if="isEdit!==true">
        <div class="inputgroup">
          <label class="label">Mật khẩu</label>
          <app-input v-model="$v.password.$model" type="password" class="input" required></app-input>
        </div>
        <div v-if="$v.password.$error && !$v.password.required" class="notification">Mật khẩu không được để trống!</div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Nhóm quyền</label>
          <app-select
            v-model="$v.roleId.$model"
            :model-value="roleId"
            :value="roleId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="roles"
          ></app-select>
        </div>
        <div v-if="!$v.roleId.required" class="notification">Nhóm quyền không được để trống!</div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Nhóm người dùng</label>
          <app-select
            v-model="$v.positionId.$model"
            :model-value="positionId"
            :value="positionId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="positions"
          ></app-select>
        </div>
        <div v-if="!$v.positionId.required" class="notification">Nhóm người dùng không được để trống!</div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Khoa</label>
          <app-select
            v-model="facultyId"
            :model-value="facultyId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="faculties"
            :disabled="DisableByPDT"
          ></app-select>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Bộ môn</label>
          <app-select
            v-model="sectionId"
            :model-value="sectionId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="Sections"
            :disabled="DisableByPDT || DisableByTK"
          ></app-select>
        </div>
      </div>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
const PHONG_DAO_TAO_CODE = 'PDT';
const TRUONG_KHOA_CODE = 'TK';
export default {
  props: {
    roles: {
      type: Array,
      default: () => [],
    },
    faculties: {
      type: Array,
      default: () => [],
    },
    currentEmployee: {
      type: Object,
      default: () => {},
    },
    positions: {
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
  },
  data() {
    return {
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
      employeeCode: this.currentEmployee?.employeeCode || null,
      name: this.currentEmployee?.name || null,
      email: this.currentEmployee?.email || null,
      password: this.currentEmployee?.password || null,
      phoneNumber: this.currentEmployee?.phoneNumber || '',
      roleId: this.currentEmployee?.roleId || null,
      facultyId: this.currentEmployee?.facultyId || null,
      positionId: this.currentEmployee?.positionEmployees[0].positionId || null,
      sectionId: this.currentEmployee?.sectionId || null,
    };
  },
  validations() {
    return {
      employeeCode: {
        required,
        minLength: minLength(3),
      },
      name: {
        required,
        minLength: minLength(4),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(4),
      },
      roleId: {
        required,
      },
      positionId: {
        required,
      },
    };
  },
  computed: {
    Sections() {
      return this.facultyId !== null
        ? this.sections.filter((element) => {
            return element.facultyId === this.facultyId;
          })
        : this.sections;
    },
    // disable by pos.code === 'PDT'
    DisableByPDT() {
      const currentPosition = this.positions.find(
        (pos) => pos.id === this.positionId && pos.code === PHONG_DAO_TAO_CODE,
      );
      if (currentPosition) return true;
      return false;
    },
    // disable by pos.code === 'TK'
    DisableByTK() {
      const currentPosition = this.positions.find((pos) => pos.id === this.positionId && pos.code === TRUONG_KHOA_CODE);
      if (currentPosition) return true;
      return false;
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const employee = {
        name: this.name,
        email: this.email,
        employeeCode: this.employeeCode,
        password: this.password,
        facultyId: this.facultyId,
        positionId: this.positionId,
        roleId: this.roleId,
        sectionId: this.sectionId,
      };
      if(this.isEdit===true){
        employee.id = this.currentEmployee.id;
      }
      const payload = employee;
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
      margin-bottom: -6px;
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
