<template>
  <div class="major-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="inputgroup">
        <label class="label">Khoa</label>
        <app-select
          v-model="facultyId"
          :model-value="facultyId"
          :value="facultyId"
          :value-prop="'id'"
          :label-prop="'name'"
          :items="faculties"
        ></app-select>
      </div>
      <div class="notification">
        <p v-if="checkEmptyFaculty === true">Bạn phải chọn khoa!</p>
      </div>

      <div class="inputgroup">
        <label class="label">Bộ môn</label>
        <app-select
          v-model="sectionId"
          :model-value="sectionId"
          :value="sectionId"
          :value-prop="'id'"
          :label-prop="'name'"
          :items="
            facultyId !== null
              ? sections.filter((element) => {
                  return element.facultyId === facultyId;
                })
              : sections
          "
        ></app-select>
      </div>
      <div class="notification">
        <p v-if="checkEmptySection === true">Bạn phải chọn bộ môn!</p>
      </div>

      <div class="inputgroup">
        <label class="label">Mã ngành học</label>
        <app-input v-model="code" type="text" class="input" required></app-input>
      </div>
      <div class="notification">
        <p v-if="checkEmptyCode === true">Mã ngành học không được để trống!</p>
        <p v-if="checkDuplicateCode === true">Mã ngành học này đã tồn tại!</p>
      </div>
      <div class="inputgroup">
        <label class="label">Tên ngành học</label>
        <app-input v-model="name" type="text" class="input" required></app-input>
      </div>
      <div class="notification">
        <p v-if="checkEmptyName === true">Tên ngành học không được để trống!</p>
        <p v-if="checkDuplicateName === true">Tên ngành học này đã tồn tại!</p>
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
    faculties: {
      type: Array,
      default: () => [],
    },
    sections: {
      type: Array,
      default: () => [],
    },
    majors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: null,
      code: null,
      facultyId: null,
      sectionId: null,
      checkEmptyFaculty: false,
      checkEmptySection: false,
      checkEmptyCode: false,
      checkDuplicateCode: false,
      checkEmptyName: false,
      checkDuplicateName: false,
    };
  },
  created() {
    // console.log(this.sections);
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const check = (value) => {
        if (!value) return true;
        else return false;
      };

      //  checkEmty
      this.checkEmptyFaculty = check(this.facultyId);
      this.checkEmptySection = check(this.facultyId);
      this.checkEmptyName = check(this.name);
      this.checkEmptyCode = check(this.code);

      //  checkDuplicate
      this.checkDuplicateCode = this.majors.some((element) => {
        if (element.code === this.code) {
          return true;
        }
        return false;
      });

      this.checkDuplicateName = this.majors.some((element) => {
        if (element.name === this.name) {
          return true;
        }
        return false;
      });

      if (
        this.checkDuplicateCode === false &&
        this.checkDuplicateName === false &&
        this.checkEmptyFaculty === false &&
        this.checkEmptySection === false &&
        this.checkEmptyCode === false &&
        this.checkEmptyName === false
      ) {
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
      text-align: center;
      font-size: 15px;
      font-family: 'Inter';
      margin-top: -16px;
      margin-bottom: 10px;
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
