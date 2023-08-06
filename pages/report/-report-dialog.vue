<template>
  <div class="report-dialog">
    <h2 class="title">{{ currentTrainingProgram.name }}</h2>
    <div class="body">
      <div v-for="(knowledgeBlock, index) in sortKnowledgeBlockList" :key="knowledgeBlock.name" class="content">
        <div v-if="index !== 0"><hr /></div>
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
                    <th class="col">TC</th>
                    <th class="col">Hệ số</th>
                    <th class="col">Số giờ học</th>
                    <th class="col">HP Tiên quyết</th>
                    <th class="col">TC Tiên quyết</th>
                  </tr>
                </thead>
                <tbody class="body">
                  <tr v-for="subject in knowledgeBlock.subjectList" :key="subject.id" class="row">
                    <td class="cell">{{ subject.code }}</td>
                    <td class="cell">{{ subject.name }}</td>
                    <td class="cell">{{ subject.numberOfCredits }}</td>
                    <td class="cell">{{ subject.coefficient }}</td>
                    <td class="cell">{{ subject.numberOfTeachingHours }}</td>
                    <td class="cell">
                      <span v-for="(x, index1) in subject.prerequisiteSubjects" :key="x.id">
                        <span v-if="index1 !== 0">, </span>
                        {{ x.code }}</span
                      >
                    </td>
                    <td class="cell">
                      {{ subject.numberPrerequisiteCredits === 0 ? null : subject.numberPrerequisiteCredits }}
                    </td>
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
      <app-button raised class="btn -save">
        <DownloadCSV :data="json_data" name="NoiDungChuongTrinhDaoTao.csv"> Export To CSV</DownloadCSV>
      </app-button>
    </div>
  </div>
</template>
<script>
import DownloadCSV from 'vue-json-csv';
export default {
  components: {
    DownloadCSV,
  },
  props: {
    currentTrainingProgram: {
      type: Object,
      default: () => {},
    },
    kBListWithSubject: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      knowledgeBlockList: this.kBListWithSubject,
      currentSort: 'name',
      currentSortDir: 'asc',
    };
  },
  computed: {
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
    json_data() {
      const data = [];
      this.knowledgeBlockList.forEach((KB) => {
        KB.subjectList.forEach((subject) => {
          let HPTQ = '';
          for (let i = 0; i < subject.prerequisiteSubjects.length; i++) {
            if (i === 0) {
              HPTQ = HPTQ + `${subject.prerequisiteSubjects[i].code}`;
            } else {
              HPTQ = HPTQ + ', ' + `${subject.prerequisiteSubjects[i].code}`;
            }
          }
          const temp = {
            KhoiKienThuc: KB.name,
            MaMonHoc: subject.code,
            TenMonHoc: subject.name,
            TinChi: subject.numberOfCredits,
            HeSo: subject.coefficient,
            SoGioHoc: subject.numberOfTeachingHours,
            HocPhanTienQuyet: HPTQ,
            TinChiTienQuyet: subject.numberPrerequisiteCredits,
          };
          data.push(temp);
        });
      });
      return data;
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
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
.report-dialog {
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
    > .content {
      margin-top: 20px;

      > .table-group {
        display: flex;
        flex-wrap: wrap;
        > .table {
          width: 100%;
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
