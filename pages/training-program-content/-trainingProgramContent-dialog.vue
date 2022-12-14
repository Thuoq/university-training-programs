<template>
  <div class="trainingProgramContent-dialog">
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
            label="name"
            track-by="name"
            placeholder="Khối kiến thức"
            @remove="onRemove($event)"
            @select="onSelect($event)"
          ></multiselect>
        </div>
        <div class="title">
          <span class="sub">Tên CTDT:</span>
          <span class="main">{{ name }}</span>
        </div>
      </div>
      <div v-for="knowledgeBlock in sortKnowledgeBlockList" :key="knowledgeBlock.name" class="content">
        <hr />
        <div class="table-group">
          <div class="table">
            <div class="title">
              <span class="sub">Học phần:</span>
              <span class="main">{{ knowledgeBlock.name }}</span>
            </div>
            <div class="subjects-list">
              <table class="table">
                <thead class="head">
                  <tr class="row -head">
                    <th class="col" @click="sort('code')">Mã môn học</th>
                    <th class="col" @click="sort('name')">Tên môn học</th>
                  </tr>
                </thead>
                <tbody class="body">
                  <tr
                    v-for="subject in knowledgeBlock.subjectList"
                    :key="subject.id"
                    class="row"
                    @click.prevent="moveToDestination(subject, knowledgeBlock.id)"
                  >
                    <td class="cell">{{ subject.code }}</td>
                    <td class="cell">{{ subject.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div class="table">
            <div class="title">
              <span class="sub">Danh sách các học phần:</span>
            </div>
            <div class="subjects-list">
              <table class="table">
                <thead class="head">
                  <tr class="row -head">
                    <th class="col" @click="sort('code')">Mã môn học</th>
                    <th class="col" @click="sort('name')">Tên môn học</th>
                  </tr>
                </thead>
                <tbody class="body">
                  <tr
                    v-for="subject in sortDestination"
                    :key="subject.id"
                    class="row"
                    @click.prevent="moveToSource(subject, knowledgeBlock.id)"
                  >
                    <td class="cell">{{ subject.code }}</td>
                    <td class="cell">{{ subject.name }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
      currentSort: 'name',
      currentSortDir: 'asc',
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
    sortDestination() {
      const data = this.destination;
      data.sort((a, b) => {
        let modifier = 1;
        if (this.currentSortDir === 'desc') modifier = -1;
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      });
      return data;
    },
    sortKnowledgeBlockList() {
      const data = this.knowledgeBlockList;
      data.forEach((KB) => {
        KB.subjectList.sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDir === 'desc') modifier = -1;
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
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
      if (this.isEdit === false) {
        this.$emit('submit', payload);
      } else {
        this.$emit('update', payload, this.currentTrainingProgram.id);
      }
      this.$emit('closed');
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
    sort(s) {
      // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
      }
      this.currentSort = s;
    },
  },
};
</script>
<style lang="scss" scoped>
.trainingProgramContent-dialog {
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
          .subjects-list {
            max-height: 50vh;
            overflow: auto;
            > .table {
              border-collapse: collapse;
              padding: 12px 48px 12px 25px;
              font-size: 16px;
              width: 100%;
            }
          }
          .subjects-list > .table > .head {
            color: var(--color-primary);
            font-size: 17px;
            line-height: 21px;
            font-weight: 700;
            width: 100%;
            text-align: left;
            > .row {
              border: 1px solid rgba(0, 0, 0, 0.15);
            }
            > .row > .col {
              padding: 10px 0px 10px 10px;
              // position: sticky;
              // top: 0;
              // z-index: 1;
              background-color: rgba($color: #3340bf, $alpha: 0.17);
              &:first-child {
                text-align: center;
              }
            }
          }
          .subjects-list > .table > .body > .row {
            border: 1px solid rgba(0, 0, 0, 0.15);
            width: 100%;
            > .cell {
              padding: 13px 0px 13px 13px;
              &:first-child {
                text-align: center;
              }
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
