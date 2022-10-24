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
    <tr v-for="(subject, index) in subjects" :key="subject.id" class="row">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ subject.code }}</td>
      <td class="cell">{{ subject.name }}</td>
      <td class="cell">{{ subject.numberOfCredits }}</td>
      <td class="cell">{{ subject.coefficient }}</td>
      <td class="cell">{{ subject.numberOfTeachingHours }}</td>
      <td class="cell">
        <span v-for="x in subject.prerequisiteSubjects" :key="x.id" class="groupvalue">{{x.code}}</span>
      </td>
      <td class="cell">{{ subject.numberPrerequisiteCredits === 0 ? null : subject.numberPrerequisiteCredits }}</td>
    </tr>
  </table>
</template>
<script>
import { pathified } from '~/utils';
const subjectsStore = pathified('subjects');
export default {
  computed: {
    subjects: subjectsStore.$get('subjects'),
  },
  async created() {
    await subjectsStore.$dispatch('getListSubjects');
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
  > .row > .cell>.groupvalue {
    margin-right: 5px;
  }
}
</style>
