<template>
  <div class="subject-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã HP</th>
          <th class="col">Tên Học Phần</th>
          <th class="col">TC</th>
          <th class="col">Hệ số</th>
          <th class="col">Số giờ học</th>
          <th class="col">HP Tiên quyết</th>
          <th class="col">TC Tiên quyết</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(subject, index) in subjects" :key="subject.id" class="row" @dblclick.prevent="openDialog(subject)">
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ subject.code }}</td>
          <td class="cell">{{ subject.name }}</td>
          <td class="cell">{{ subject.numberOfCredits }}</td>
          <td class="cell">{{ subject.coefficient }}</td>
          <td class="cell">{{ subject.numberOfTeachingHours }}</td>
          <td class="cell">
            <span v-for="x in subject.prerequisiteSubjects" :key="x.id">{{ x.code }} </span>
          </td>
          <td class="cell">{{ subject.numberPrerequisiteCredits === 0 ? null : subject.numberPrerequisiteCredits }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <subject-dialog
          :current-subject="currentSubject"
          :subjects="subjects"
          @delete="onDelete"
          @closed="closeDialog"
          @submit="onSubmit"
        ></subject-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import SubjectDialog from '~/pages/subjects/-subject-dialog';
import { pathified } from '~/utils';
const subjectsStore = pathified('subjects');
export default {
  components: { SubjectDialog },
  data() {
    return {
      visibleDialog: false,
      isEdit: true,
      currentSubject: null,
      currentSort: 'name',
      currentSortDir: 'asc',
    };
  },
  computed: {
    subjects: subjectsStore.$get('subjects'),
  },
  async created() {
    await subjectsStore.$dispatch('getListSubjects');
  },
  methods: {
    openDialog(subject) {
      this.visibleDialog = true;
      this.currentSubject = subject;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await subjectsStore.$dispatch('updateSubjects', payload);
      await subjectsStore.$dispatch('getListSubjects');
    },
    async onDelete(payload) {
      await subjectsStore.$dispatch('deleteSubject', payload);
      await subjectsStore.$dispatch('getListSubjects');
    },
  },
};
</script>
<style scoped lang="scss">
.subject-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
.subject-list > .table > .head {
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
.subject-list > .table > .body > .row {
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
