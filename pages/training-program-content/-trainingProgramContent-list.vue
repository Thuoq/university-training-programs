<template>
  <div class="trainingPrograms-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã CTĐT</th>
          <th class="col">Tên CTĐT</th>
          <th class="col">Khóa</th>
          <th class="col">Ngành</th>
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
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <trainingProgramContent-dialog
          :is-edit="isEdit"
          :current-training-program="currentTrainingProgram"
          :knowledge-blocks="knowledgeBlocks"
          :subjects="subjects"
          :k-b-list-with-subject="KBListWithSubject"
          @closed="closeDialog"
          @submit="onSubmit"
          @update="onUpdate"
        ></trainingProgramContent-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import TrainingProgramContentDialog from '~/pages/training-program-content/-trainingProgramContent-dialog';
import { fetchListKnowledgeBlock } from '~/models/knowledge-block.model';
import { fetchListSubjects } from '~/models/subjects.model';
import { pathified } from '~/utils';
const trainingProgramsStore = pathified('trainingPrograms');
export default {
  components: { TrainingProgramContentDialog },
  data() {
    return {
      visibleDialog: false,
      currentTrainingProgram: null,
      knowledgeBlocks: [],
      subjects: [],
      KBListWithSubject: [],
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
      if (this.currentTrainingProgram?.trainingProgramContents?.length > 0) {
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
              knowledgeBlock.subjectList.push(obj.subject);
              const findIndex = this.subjects.findIndex((e) => e.id === obj.subject.id);
              findIndex !== -1 && this.subjects.splice(findIndex, 1);
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
    async onSubmit(payload) {
      await trainingProgramsStore.$dispatch('createTrainingProgramsContent', payload);
      await trainingProgramsStore.$dispatch('getListTrainingPrograms');
    },
    async onUpdate(payload, id) {
      await trainingProgramsStore.$dispatch('deleteTrainingProgramContentByTPId', id);
      await trainingProgramsStore.$dispatch('createTrainingProgramsContent', payload);
      await trainingProgramsStore.$dispatch('getListTrainingPrograms');
    },
  },
};
</script>
<style scoped lang="scss">
.trainingPrograms-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 1100px;
}
.trainingPrograms-list > .table > .head {
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
.trainingPrograms-list > .table > .body > .row {
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
