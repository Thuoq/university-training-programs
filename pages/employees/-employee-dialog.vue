<template>
  <div class="employee-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Mã đăng nhập</label>
        <app-input v-model="employeeCode" type="text" class="input" required></app-input>
      </div>
      <div class="inputgroup">
        <label class="label">Tên người dùng</label>
        <app-input v-model="name" type="text" class="input" required></app-input>
      </div>
      <div class="inputgroup">
        <label class="label">Email</label>
        <app-input v-model="email" type="text" class="input" required></app-input>
      </div>
      <div class="inputgroup">
        <label class="label">Mật khẩu</label>
        <app-input v-model="password" type="password" class="input" required></app-input>
      </div>
      <div class="inputgroup">
        <label class="label">Nhóm người dùng</label>
        <app-select></app-select>
      </div>
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
      <div class="inputgroup">
        <label class="label">Khoa</label>
        <app-select v-model="facultyId" :value-prop="'id'" :label-prop="'name'" :items="faculties"></app-select>
      </div>
      <div class="inputgroup">
        <label class="label">Bộ môn</label>
        <app-select></app-select>
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
      positionId: 1,
      departmentId: 1,
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const payload = this.$data;
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
    > .inputgroup {
      width: 380px;
      text-align: left;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 26px;
    }
    > .inputgroup > .label {
      font-family: 'Inter';
      color: var(--color-back);
    }

    > .inputgroup > .input {
      height: 32px;
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
