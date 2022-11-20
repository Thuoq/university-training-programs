<template>
  <div class="employee-dialog">
    <h2 class="title">Nội dung Chương trình Đào tạo</h2>
    <div class="body">
      <div class="header">
        <div class="mutilselect">
          <multiselect
            v-model="knowledgeBlockList"
            :options="knowledgeBlocksWithChild"
            :multiple="true"
            :searchable="true"
            :close-on-select="false"
            :show-labels="false"
            @remove="onRemove($event)"
            @select="onSelect($event)"
            label="name"
            track-by="name"
            placeholder="Khối kiến thức"
          ></multiselect>
        </div>
        <div class="title">
          <span class="sub">Tên CTDT:</span>
          <span class="main">{{ name }}</span>
        </div>
      </div>
      <div v-for="knowledgeBlock in knowledgeBlockList" :key="knowledgeBlock.name" class="content">
        <hr />
        <div class="table-group">
          <div class="table">
            <div class="title">
              <span class="sub">Học phần:</span>
              <span class="main">{{ knowledgeBlock.name }}</span>
            </div>
            <table class="subjects-list">
              <tr class="row -head">
                <th class="col">Mã môn học</th>
                <th class="col">Tên môn học</th>
                <th></th>
              </tr>
              <tr
                v-for="subject in knowledgeBlock.subjectList"
                :key="subject.id"
                class="row"
                @click.prevent="moveToDestination(subject, knowledgeBlock.id)"
              >
                <td class="cell">{{ subject.code }}</td>
                <td class="cell">{{ subject.name }}</td>
              </tr>
            </table>
          </div>

          <div class="table">
            <div class="title">
              <span class="sub">Danh sách các học phần:</span>
            </div>
            <table class="subjects-list">
              <tr class="row -head">
                <th class="col">Mã môn học</th>
                <th class="col">Tên môn học</th>
              </tr>
              <tr
                v-for="subject in destination"
                :key="subject.id"
                class="row"
                @click.prevent="moveToSource(subject, knowledgeBlock.id)"
              >
                <td class="cell">{{ subject.code }}</td>
                <td class="cell">{{ subject.name }}</td>
              </tr>
            </table>
          </div>
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
import Multiselect from 'vue-multiselect';
export default {
  components: {
    Multiselect,
  },
  props: {
    currentTrainingProgram: {
      type: Object,
      default: () => {},
    },
    knowledgeBlocks: {
      type: Array,
      default: () => [],
    },
    subjects: {
      type: Array,
      default: () => [],
    },
    kBListWithSubject: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
    },
  },
  data() {
    return {
      name: this.currentTrainingProgram?.name || null,
      knowledgeBlockList: this.kBListWithSubject,
      destination: this.subjects,
    };
  },
  computed: {
    knowledgeBlocksWithChild() {
      const data = [];
      this.knowledgeBlocks.forEach((kb) => {
        data.push(kb);
        if (kb.knowledgeChildren.length > 0) {
          kb.knowledgeChildren.forEach((kb) => {
            data.push(kb);
          });
        }
      });
      return data;
    },
  },
  watch: {
    knowledgeBlockList(knowledgeBlock) {
      knowledgeBlock.map((knowledgeBlock) => {
        if (!knowledgeBlock.subjectList) {
          knowledgeBlock.subjectList = [];
        }
        return knowledgeBlock;
      });
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      let data = [];
      this.knowledgeBlockList.forEach((knowledgeBlock) => {
        knowledgeBlock.subjectList.forEach((subject) =>
          data.push({ subjectId: subject.id, knowledgeBlockId: knowledgeBlock.id }),
        );
        data = data.map((obj) => ({ ...obj, trainingProgramId: this.currentTrainingProgram.id }));
      });
      const payload = data;
      this.$emit('submit', payload);
      this.$emit('closed');
      // console.log(this.knowledgeBlockList);
      // console.log(this.destination);
    },
    moveToDestination(subject, id) {
      this.knowledgeBlockList.map((obj) => {
        if (obj.id === id) {
          const findIndex = obj.subjectList.findIndex((e) => e.id === subject.id);
          findIndex !== -1 && obj.subjectList.splice(findIndex, 1);
          this.destination.push(subject);
        }
        return obj;
      });
    },
    moveToSource(subject, id) {
      const findIndex = this.destination.findIndex((e) => e.id === subject.id);
      findIndex !== -1 && this.destination.splice(findIndex, 1);
      this.knowledgeBlockList.map((obj) => {
        if (obj.id === id) {
          obj.subjectList.push(subject);
        }
        return obj;
      });
    },
    onRemove(knowledgeBlock) {
      knowledgeBlock.subjectList.forEach((subject) => {
        this.destination.push(subject);
      });
    },
    onSelect(obj) {
      obj.subjectList = [];
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
    margin-bottom: 30px;
    > .header {
      display: flex;
      margin-top: 30px;
      flex-wrap: wrap;
      justify-content: space-between;
      > .mutilselect {
        width: 30%;
        > .list {
          height: 30px;
        }
      }
      > .title {
        padding-top: 10px;
        text-align: left;
        margin-bottom: 26px;
        font-family: 'Inter';
        > .sub {
          font-size: 15px;
          color: black;
        }
        > .main {
          font-size: 16px;
          font-weight: bold;
          color: #454c8e;
          font-style: italic;
        }
      }
    }

    > .content {
      margin-top: 20px;

      > .table-group {
        display: flex;
        flex-wrap: wrap;
        > .table {
          width: 50%;
          > .title {
            margin-top: 10px;
            margin-bottom: 10px;
            font-family: 'Inter';
            color: black;
            > .sub {
              font-size: 15px;
            }
            > .main {
              font-size: 16px;
              font-weight: bold;
            }
          }
          > .subjects-list {
            border-collapse: collapse;
            padding: 12px 48px 12px 25px;
            font-size: 16px;
            width: 100%;
            overflow-y: auto;
            overflow-x: hidden;

            > .row {
              border: 1px solid rgba(0, 0, 0, 0.15);
              &.-head {
                color: var(--color-primary);
                font-size: 17px;
                line-height: 21px;
                font-weight: 700;
                text-align: left;
                background-color: rgba($color: #3340bf, $alpha: 0.17);
              }
            }
            > .row > .col {
              padding: 10px 0px 10px 10px;
            }
            > .row .col:first-child {
              text-align: center;
            }
            > .row > .cell:first-child {
              text-align: center;
            }
            > .row > .cell {
              padding: 13px 0px 13px 13px;
            }
          }
        }
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
