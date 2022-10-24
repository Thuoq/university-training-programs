<template>
  <div class="employee-dialog">
    <h2 class="title">Thêm mới</h2>
    <div class="body">
      <div class="grouptext">
        <div class="group">
          <div class="inputgroup">
            <label class="label">Mã học phần</label>
            <app-input v-model="code" type="text" class="input" required></app-input>
          </div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Tên học phần</label>
            <app-input v-model="name" type="text" class="input" required></app-input>
          </div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số tín chỉ</label>
            <app-input v-model="numberOfCredits" type="text" class="input" required></app-input>
          </div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số giờ học</label>
            <app-input v-model="numberOfTeachingHours" type="text" class="input" required></app-input>
          </div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Hệ số</label>
            <app-input v-model="coefficient" type="text" class="input" required></app-input>
          </div>
        </div>

        <div class="group">
          <div class="inputgroup">
            <label class="label">Số tín chỉ tiên quyết</label>
            <app-input v-model="numberPrerequisiteCredits" type="text" class="input"></app-input>
          </div>
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
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
export default {
  components: {
    Multiselect,
  },
  props: {
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: null,
      code: null,
      numberOfCredits: null,
      numberPrerequisiteCredits: null,
      numberOfTeachingHours: null,
      coefficient: null,
      prerequisiteSubjectsId: null,
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
        numberPrerequisiteCredits: !this.numberPrerequisiteCredits ? 0 : this.numberPrerequisiteCredits,
        numberOfTeachingHours: Number(this.numberOfTeachingHours),
        code: this.code,
        coefficient: 2,
        prerequisiteSubjectsId: !this.prerequisiteSubjectsId
          ? []
          : this.prerequisiteSubjectsId.map((subject) => ({ id: subject.id })),
      };
      const payload = subject;
      this.$emit('submit', payload);
      this.$emit('closed');
    console.log(subject);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
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
