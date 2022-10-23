<template>
    <div class="faculty-dialog">
      <h2 class="title">Thêm mới</h2>
      <div class="body">
        <div class="inputgroup">
          <label class="label">Mã khóa</label>
          <app-input v-model="code" type="text" class="input"></app-input>
        </div>
        
        <div class="inputgroup">
          <label class="label">Tên khóa</label>
          <app-input v-model="name" type="text" class="input"></app-input>
        </div>
        <!-- <div v-if="!$v.name.required">Field is required</div> -->

        <div class="inputgroup">
          <label class="label">Năm bắt đầu</label>
          <app-input v-model="startYear" type="text" class="input"></app-input>
        </div>
        <div class="inputgroup">
          <label class="label">Năm kết thúc</label>
          <app-input v-model="finishYear" type="text" class="input"></app-input>
        </div>
      </div>

      <div class="footer">
        <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
        <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
      </div>
    </div>
  </template>
  <script>
  import { required} from 'vuelidate/lib/validators'
  export default {
    // props: {
    //   faculties: {
    //     type: Array,
    //     default: () => [],
    //   },
    //   sections: {
    //     type: Array,
    //     default: () => [],
    //   },
    // },
    data() {
      return {
        name: null,
        code: null,
        startYear: null,
        finishYear: null
        // facultyId: null,
        // checkEmptyFaculty: false,
        // checkEmptyCode: false,
        // checkDuplicateCode: false,
        // checkEmptyName: false,
        // checkDuplicateName: false,
      };
    },
    validations: {
    name: {
      required,
    },
  },
    methods: {
      onClosed() {
        this.$emit('closed');
      },
      onSubmit() {
        // const check = (value) => {
        //   if (!value) return true;
        //   else return false;
        // };
  
        // //  checkEmty
        // this.checkEmptyFaculty = check(this.facultyId);
        // this.checkEmptyName = check(this.name);
        // this.checkEmptyCode = check(this.code);
  
        // //  checkDuplicate
        // this.checkDuplicateCode = this.sections.some((element) => {
        //   if (element.code === this.code) {
        //     console.log(this.code);
        //     return true;
        //   }
        //   return false;
        // });
  
        // this.checkDuplicateName = this.sections.some((element) => {
        //   if (element.name === this.name) {
        //     return true;
        //   }
        //   return false;
        // });
  
        // if (
        //   this.checkDuplicateCode === false &&
        //   this.checkDuplicateName === false &&
        //   this.checkEmptyFaculty === false &&
        //   this.checkEmptyCode === false &&
        //   this.checkEmptyName === false
        // ) {
        //   const section = {
        //     name: this.name,
        //     code: this.code,
        //     facultyId: this.facultyId,
        //   };
  
        //   const payload = section;
        //   this.$emit('submit', payload);
        //   this.$emit('closed');
        // }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .faculty-dialog {
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
        width: 480px;
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
  