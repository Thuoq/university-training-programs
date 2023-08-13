<template>
  <div class="employee-dialog">
    <h2 class="title">{{ title }}</h2>
    <div class="body">
      <app-input-v2
        v-model="employeeCode"
        :error="$v.employeeCode.$error"
        :error-messages="$validationError.employeeCode"
        class="group"
        type="text"
        required
        label="Mã đăng nhập"
        @input="$v.employeeCode.$touch()"
        @blur="$v.employeeCode.$touch()"
      >
      </app-input-v2>
      <app-input-v2
        v-model="name"
        :error="$v.name.$error"
        :error-messages="$validationError.name"
        class="group"
        type="text"
        required
        label="Tên người dùng"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </app-input-v2>
      <app-input-v2
        v-model="email"
        :error="$v.email.$error"
        :error-messages="$validationError.email"
        class="group"
        type="text"
        required
        label="Email"
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      >
      </app-input-v2>
      <app-input-v2
        v-if="!isEdit"
        v-model="password"
        :error="$v.password.$error"
        :error-messages="$validationError.password"
        class="group"
        type="text"
        required
        label="Mật Khẩu"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
      >
      </app-input-v2>

      <app-select-v2
        v-model="roleId"
        :model-value="roleId"
        :value="roleId"
        value-prop="id"
        label-prop="name"
        :items="roles"
        :error="$v.password.$error"
        :error-messages="$validationError.password"
        class="group"
        type="text"
        required
        label="Nhóm quyền"
        @input="$v.roleId.$touch()"
        @blur="$v.roleId.$touch()"
      >
      </app-select-v2>
      <div class="app-mutilselect group">
        <div class="wrapper">
          <span class="label">Nhóm người dùng</span>
          <span class="required">*</span>
        </div>
        <multiselect
          v-model="positionsSelected"
          :options="positions"
          :multiple="true"
          :searchable="true"
          :close-on-select="false"
          :allow-empty="false"
          label="name"
          name="id"
          track-by="id"
          placeholder="Chọn nhóm người dùng"
          class="list"
          @input="$v.positionsSelected.$touch()"
        ></multiselect>
      </div>

      <app-select-v2
        v-model="facultyId"
        :model-value="!DisableByPDT ? facultyId : null"
        value-prop="id"
        label-prop="name"
        :items="faculties"
        label="Khoa"
        class="group"
        :disabled="DisableByPDT"
        @change="onChange(facultyId)"
      >
      </app-select-v2>

      <app-select-v2
        v-model="sectionId"
        label="Bộ môn"
        :model-value="!(DisableByPDT || DisableByTK) ? sectionId : null"
        value-prop="id"
        label-prop="name"
        :items="sectionsFilter"
        class="group"
        :disabled="DisableByPDT || DisableByTK"
      ></app-select-v2>
    </div>
    <div class="footer">
      <div class="cancel">
        <app-button v-if="isEdit" raised class="btn -delete" @click="onDelete">Xoá</app-button>
      </div>
      <div class="submit">
        <app-button raised class="btn -close" @click="onClosed">Huỷ</app-button>
        <app-button :disabled="$v.$invalid" raised class="btn -save" @click="onSubmit">Lưu</app-button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength, email } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import { fetchListRoles } from '~/models/roles.model';
import { getListFaculties } from '~/models/faculties.model';
import { fetchListPositions } from '~/models/positions.model';
import { fetchListSections } from '~/models/sections.model';
const PHONG_DAO_TAO_CODE = 'PDT';
const TRUONG_KHOA_CODE = 'TK';

export default {
  components: {
    Multiselect,
  },
  props: {
    currentEmployee: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      employeeCode: this.currentEmployee?.employeeCode || null,
      name: this.currentEmployee?.name || null,
      email: this.currentEmployee?.email || null,
      password: this.currentEmployee?.password || null,
      phoneNumber: this.currentEmployee?.phoneNumber || '',
      roleId: this.currentEmployee?.roleId || null,
      facultyId: this.currentEmployee?.facultyId || null,
      positionsSelected:
        (this.currentEmployee?.positionEmployees || []).map((positionEmployee) => positionEmployee.position) || null,
      sectionId: this.currentEmployee?.sectionId || null,

      roles: [],
      faculties: [],
      positions: [],
      sections: [],
    };
  },
  computed: {
    sectionsFilter() {
      return this.facultyId !== null
        ? this.sections.filter((element) => {
            return element.facultyId === this.facultyId;
          })
        : this.sections;
    },
    // disable by pos.code === 'PDT'
    DisableByPDT() {
      return this.positions.some((pos) => this.positionsSelected.includes(pos.id) && pos.code === PHONG_DAO_TAO_CODE);
    },
    // disable by pos.code === 'TK'
    DisableByTK() {
      return this.positions.some((pos) => this.positionsSelected.includes(pos.id) && pos.code === TRUONG_KHOA_CODE);
    },
    isEdit() {
      return !!this.currentEmployee?.id;
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
    employeePayload() {
      return {
        name: this.name,
        email: this.email,
        employeeCode: this.employeeCode,
        password: this.password,
        facultyId: !this.DisableByPDT ? this.facultyId : null,
        positionIds: this.positionsSelected.map((pos) => pos.id),
        roleId: this.roleId,
        sectionId: !(this.DisableByPDT || this.DisableByTK) ? this.sectionId : null,
      };
    },
  },
  async created() {
    const [sections, roles, faculties, positions] = await Promise.all([
      fetchListSections(),
      fetchListRoles(),
      getListFaculties(),
      fetchListPositions(),
    ]);
    this.sections = sections;
    this.roles = roles;

    this.faculties = faculties;
    this.positions = positions;
  },
  errorTextValidator: {
    employeeCode: {
      required: 'Mã đăng nhập không được để trống!',
      minLength: 'Mã đăng nhập phải có tối thiểu từ 3 kí tự trở lên!',
    },
    name: {
      required: 'Tên người dùng không được để trống!',
      minLength: 'Tên người dùng phải có tối thiểu từ 4 kí tự trở lên!',
    },
    email: {
      email: 'Email phải có định dang là 1 email ví dụ: test@gmail.com!',
      required: 'Email không được để trống!',
    },
    password: {
      required: 'Mật khẩu không được để trống!',
    },
    roleId: {
      required: 'Nhóm quyền không được để trống!',
    },
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
      positionsSelected: {
        required,
      },
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const employee = {
        ...this.employeePayload,
      };
      if (this.isEdit) {
        employee.id = this.currentEmployee.id;
      }
      const payload = employee;
      this.$emit('submit', payload);
      this.$emit('closed');
      // console.log(payload);
    },
    onChange(facultyId) {
      if (this.sectionId && this.sections.length) {
        let findIndex = null;
        this.sections.forEach((e) => {
          if (e.id === this.sectionId) {
            findIndex = e;
          }
        });
        if (findIndex?.facultyId !== facultyId) {
          this.sectionId = null;
        }
      }
    },
    onDelete() {},
  },
};
</script>

<style lang="scss" scoped>
@import './vue-multiselect.min.scss';
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
    display: flex;
    margin-top: 30px;
    flex-wrap: wrap;
    justify-content: space-between;
    > .group {
      width: 400px;
      text-align: left;
      margin-bottom: 26px;
    }
    > .group > .inputgroup > .label {
      font-family: 'Inter';
      color: var(--color-back);
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
    justify-content: space-between;
    align-items: center;
  }
}
.app-mutilselect {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 380px;
}
.app-mutilselect > .multiselect {
  width: 250px;
  height: 40px;
}
.app-mutilselect > .wrapper {
  font-family: 'Inter';
  color: var(--color-back);
  font-size: 14px;
  display: flex;
  align-items: center;
  > .required {
    color: var(--color-error);
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
