<template>
    <div class="facultie-dialog">
      <h2 class="title">Thêm mới</h2>
      <div class="body">
        <div class="inputgroup">
          <label class="label">Mã khoa</label>
          <app-input v-model="code" class="input" type="text" required></app-input>
          <span v-if="checkEmptyCode === true" class="notification">
            <br />
           Mã khoa không được để trống
          </span>
          <span v-if="checkNotification === true" class="notification">
            <br />
            Mã khoa đã tồn tại
          </span>
        </div>
        <div class="inputgroup">
          <label class="label">Tên khoa</label>
          <app-input v-model="name" class="input" type="text" required></app-input>
          <span v-if="checkEmptyName === true" class="notification">
            <br />
           Tên khoa không được để trống
          </span>
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
    },
    data() {
      return {
        name: null,
        code: null,
        sectionID: 1,
        checkNotification: false,
        checkEmptyCode: false,
        checkEmptyName: false
      };
    },
    methods: {
      onClosed() {
        this.$emit('closed');
      },
      onSubmit() {
        // this.checkNotification = false;
        // this.checkEmptyName = false;
        // this.checkEmptyCode = false;
        // if (this.name !== null && this.code !== null) {
        //   const checkCode = this.faculties.some((element) => {
        //     if (element.code === this.code) {
        //       return true;
        //     }
        //     return false;
        //   });
        //   if (checkCode) {
        //     this.checkNotification = true;
        //   } else {
            const faculty= {
              name : this.name,
            //   code : this.code
            sectionId :1,
            }
            const payload = faculty;
            // console.log(faculty);
            this.$emit('submit', payload);
            this.$emit('closed');
    //       }
    //     }else{
    //       if(this.name === null)
    //         this.checkEmptyName = true;
    //         if(this.code === null)
    //         this.checkEmptyCode = true;  
    //     }
      },
    },
  };
  </script>
  
  <style lang="scss" scoped>
  .facultie-dialog {
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
      text-align: center;
      margin: 23px 0px 23px 0px;
      > .inputgroup {
        position: relative;
        display: inline-block;
      }
      > .inputgroup:not(:last-child) {
        margin-bottom: 23.13px;
      }
    }
  
    > .body > .inputgroup > .input {
      background-color: var(--color-white);
      border: 1px solid black;
      width: 250px;
      height: 40px;
      border-radius: 5px;
    }
  
    > .body > .inputgroup > .label {
      margin-right: 10px;
      width: 200px;
      text-align: right;
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
      font-family: 'Inter';
      color: var(--color-back);
    }
  
    > .body > .inputgroup > .notification {
      font-size: 12px;
      color: red;
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
  