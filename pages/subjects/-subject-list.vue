<template>
  <table class="subject-list">
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
    <tr v-for="(subject, index) in subjects" :key="subject.id" class="row" @dblclick.prevent="openDialog(subject)">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ subject.code }}</td>
      <td class="cell">{{ subject.name }}</td>
      <td class="cell">{{ subject.numberOfCredits }}</td>
      <td class="cell">{{ subject.coefficient }}</td>
      <td class="cell">{{ subject.numberOfTeachingHours }}</td>
      <td class="cell">
        <span v-for="x in subject.prerequisiteSubjects" :key="x.id" class="groupvalue">{{ x.code }}</span>
      </td>
      <td class="cell">{{ subject.numberPrerequisiteCredits === 0 ? null : subject.numberPrerequisiteCredits }}</td>
    </tr>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <subject-dialog
        :isEdit="isEdit"
        :currentSubject="currentSubject"
        :subjects="subjects"
        @closed="closeDialog"
        @submit="onSubmit"
      ></subject-dialog>
    </app-dialog>
  </table>
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
      // await subjectsStore.$dispatch('updateSubjects', payload);
      // await subjectsStore.$dispatch('getListSubjects');
      await console.log(payload);
    },
  },
};
</script>
<style scoped lang="scss">
.subject-list {
  border-collapse: collapse;
  padding: 12px 48px 12px 25px;
  font-size: 16px;
  width: 100%;
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
  > .row > .cell > .groupvalue {
    margin-right: 5px;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
</style>
