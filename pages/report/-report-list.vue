<template>
  <div class="report-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã CTĐT</th>
          <th class="col">Tên CTĐT</th>
          <th class="col">Khóa</th>
          <th class="col">Ngành</th>
          <th class="col">Tổng số học phần</th>
          <th class="col">Tổng số tín chỉ</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr
          v-for="(trainingProgram, index) in trainingPrograms"
          :key="trainingProgram.id"
          class="row"
          @dblclick.prevent="openDialog(trainingProgram)"
        >
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ trainingProgram.code }}</td>
          <td class="cell">{{ trainingProgram.name }}</td>
          <td class="cell">{{ trainingProgram.academicYear?.name }}</td>
          <td class="cell">{{ trainingProgram.marjor?.name }}</td>
          <td class="cell">{{ getTotalSubject(trainingProgram) }}</td>
          <td class="cell">{{ getTotalCredit(trainingProgram) }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <report-dialog
          :currentTrainingProgram="currentTrainingProgram"
          :kBListWithSubject="KBListWithSubject"
          @closed="closeDialog"
        ></report-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import ReportDialog from '~/pages/report/-report-dialog.vue';
import { fetchListKnowledgeBlock } from '~/models/knowledge-block.model';
import { fetchListSubjects } from '~/models/subjects.model';
import { pathified } from '~/utils';
const trainingProgramsStore = pathified('trainingPrograms');
export default {
  components: { ReportDialog },
  data() {
    return {
      visibleDialog: false,
      currentTrainingProgram: null,
      KBListWithSubject: [],
      knowledgeBlocks: [],
      subjects: [],
      isEdit: false,
    };
  },
  computed: {
    trainingPrograms: trainingProgramsStore.$get('trainingPrograms'),
  },
  async created() {
    await trainingProgramsStore.$dispatch('getListTrainingPrograms');
  },
  methods: {
    async openDialog(trainingProgram) {
      this.currentTrainingProgram = trainingProgram;
      this.knowledgeBlocks = await fetchListKnowledgeBlock();
      this.subjects = await fetchListSubjects();

      // KBWithSubjectList = knowledgeBlockwithsubjectList
      let KBWithSubjectList = [];
      if (this.currentTrainingProgram.trainingProgramContents.length > 0) {
        this.isEdit = true;
        // create a set of knowledgeBlockId
        const knowledgeBlockIdList = [
          ...new Set(this.currentTrainingProgram.trainingProgramContents.map((a) => a.knowledgeBlockId)),
        ];

        // add every knowblocklist include child of itself if exits and child.id exit in knowledgeBlockIdList
        knowledgeBlockIdList.forEach((id) => {
          const temp = this.knowledgeBlocks.find((obj) => obj.id === id);
          if (temp) {
            KBWithSubjectList.push(temp);
            if (temp.knowledgeChildren.length > 0) {
              knowledgeBlockIdList.forEach((id) => {
                temp.knowledgeChildren.forEach((kb) => {
                  if (id === kb.id) {
                    KBWithSubjectList.push(kb);
                  }
                });
              });
            }
          }
        });

        // add subject to corresponds knowledgeBlock to it
        KBWithSubjectList = KBWithSubjectList.map((obj) => ({ ...obj, subjectList: [] }));
        KBWithSubjectList.forEach((knowledgeBlock) => {
          this.currentTrainingProgram.trainingProgramContents.forEach((obj) => {
            if (obj.knowledgeBlockId === knowledgeBlock.id) {
              this.subjects.forEach((subject) => {
                if (subject.id === obj.subject.id) {
                  obj.subject.prerequisiteSubjects = subject.prerequisiteSubjects;
                }
              });
              knowledgeBlock.subjectList.push(obj.subject);
            }
          });
        });
      }
      this.KBListWithSubject = KBWithSubjectList;
      this.visibleDialog = true;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    getTotalSubject(trainingProgram) {
      return trainingProgram.trainingProgramContents.length;
    },
    getTotalCredit(trainingProgram) {
      let sum = 0;
      trainingProgram.trainingProgramContents.forEach((obj) => {
        sum += obj.subject.numberOfCredits;
      });
      return sum;
    },
  },
};
</script>
<style scoped lang="scss">
.report-list {
  height: 100vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 1050px;
}
.report-list > .table > .head {
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
.report-list > .table > .body > .row {
  border: 1px solid rgba(0, 0, 0, 0.15);
  width: 100%;
  > .cell {
    padding: 13px 0px 13px 13px;
    &:first-child {
      text-align: center;
    }
  }
}
</style>
