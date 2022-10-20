<template>
  <div class="employee-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="group">
        <div class="inputgroup">
          <label class="label">Mã đăng nhập</label>
          <app-input v-model="employeeCode" type="text" class="input" required></app-input>
        </div>
        <div class="notification">
          <p v-if="checkEmptyEmployeeCode === true">Mã đăng nhập không được để trống!</p>
          <p v-if="checkDuplicateEmployeeCode === true">Mã đăng nhập này đã tồn tại!</p>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Tên người dùng</label>
          <app-input v-model="name" type="text" class="input" required></app-input>
        </div>
        <div class="notification">
          <p v-if="checkEmptyName === true">Tên người dùng không được để trống!</p>
          <p v-if="checkDuplicateName === true">Tên người dùng này đã tồn tại!</p>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Email</label>
          <app-input v-model="email" type="text" class="input" required></app-input>
        </div>
        <div class="notification">
          <p v-if="checkEmptyEmail === true">Email không được để trống!</p>
          <p v-if="checkDuplicateEmail === true">Email này đã tồn tại!</p>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Mật khẩu</label>
          <app-input v-model="password" type="password" class="input" required></app-input>
        </div>
        <div class="notification">
          <p v-if="checkEmptyPass === true">Mật khẩu không được để trống!</p>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Nhóm quyền</label>
          <app-select
            v-model="roleId"
            :model-value="roleId"
            :value="roleId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="roles"
          ></app-select>
        </div>
        <div class="notification">
          <p v-if="checkEmptyRole === true">Nhóm quyền không được để trống!</p>
        </div>
      </div>

      <div class="group">
        <div class="inputgroup">
          <label class="label">Nhóm người dùng</label>
          <app-select
            v-model="positionId"
            :model-value="positionId"
            :value="positionId"
            :value-prop="'id'"
            :label-prop="'name'"
            :items="positions"
          ></app-select>
        </div>
        <div class="notification">
          <p v-if="checkEmptyPosition === true">Nhóm người dùng không được để trống!</p>
        </div>
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
          ></app-select>
        </div>
        <div class="notification">
          <p v-if="checkEmptyFaculty === true">Khoa không được để trống!</p>
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
            :items="
            positions.find(o => o.id === this.positionId).code !== 'PDT' ?
              (facultyId !== null 
                ? sections.filter((element) => {
                    return element.facultyId === facultyId;
                  })
                : sections) : null
            "
          ></app-select>
        </div>
        <div class="notification">
          <p v-if="checkEmptySection === true">Bộ môn không được để trống!</p>
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
    employees: {
      type: Array,
      default: () => [],
    },
    positions: {
      type: Array,
      default: () => [],
    },
    sections: {
      type: Array,
      default: () => [],
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
      positionId: this.currentEmployee?.positionEmployees[0].positionId || null,
      sectionId: this.currentEmployee?.sectionId || null,

      // check
      checkEmptyEmployeeCode: false,
      checkDuplicateEmployeeCode: false,
      checkEmptyName: false,
      checkDuplicateName: false,
      checkEmptyEmail: false,
      checkDuplicateEmail: false,
      checkEmptyPass: false,
      checkEmptyPosition: false,
      checkEmptyRole: false,
      checkEmptyFaculty: false,
      checkEmptySection: false,
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
        // const checkNull = (value) => {
        //   if (!value) return true;
        //   else return false;
        // };

        // const checkDuplicate = (dataArray, fieldName, value) => {
        //   return dataArray.some((e) => {
        //     if (e[`${fieldName}`] === value) {
        //       return true;
        //     }
        //     return false;
        //   });
        // };

        // // checkEmpty
        // this.checkEmptyEmployeeCode = checkNull(this.employeeCode);
        // this.checkEmptyName = checkNull(this.name);
        // this.checkEmptyEmail = checkNull(this.email);
        // this.checkEmptyPass = checkNull(this.password);
        // this.checkEmptyPosition = checkNull(this.positionId);
        // this.checkEmptyRole = checkNull(this.roleId);
        // this.checkEmptyFaculty = checkNull(this.facultyId);
        // this.checkEmptySection = checkNull(this.sectionId);

        // //  checkDuplicate
        // this.checkDuplicateEmployeeCode = checkDuplicate(this.employees, 'employeeCode', this.employeeCode);
        // this.checkDuplicateName = checkDuplicate(this.employees, 'name', this.name);
        // this.checkDuplicateEmail = checkDuplicate(this.employees, 'email', this.email);

        // if (
        //   (this.checkEmptyEmployeeCode &&
        //     this.checkEmptyName &&
        //     this.checkEmptyEmail &&
        //     this.checkEmptyPass &&
        //     this.checkEmptyPosition &&
        //     this.checkEmptyRole &&
        //     this.checkEmptyFaculty &&
        //     this.checkEmptySection &&
        //     this.checkDuplicateName &&
        //     this.checkDuplicateEmployeeCode &&
        //     this.checkDuplicateEmail) === false
        // ) {
        //   const employee = {
        //     name: this.name,
        //     email: this.email,
        //     employeeCode: this.employeeCode,
        //     password: this.password,
        //     // phoneNumber: 'string',
        //     facultyId: this.facultyId,
        //     // departmentId: 0,
        //     positionId: this.positionId,
        //     roleId: this.roleId,
        //     sectionId: this.sectionId,
        //   };

        //   const payload = employee;
        //   this.$emit('submit', payload);
        //   this.$emit('closed');
        // }

      // const test =  this.positions.find(o => o.id === this.positionId).code;
      // console.log(test);            
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
      text-align: center;
      font-size: 15px;
      font-family: 'Inter';
      margin-top: 16px;
      margin-bottom: 10px;
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
