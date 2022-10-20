<template>
  <table class="major-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã ngành học</th>
      <th class="col">Tên ngành học</th>
      <th class="col">Bộ môn</th>
      <th class="col">Khoa</th>
    </tr>
    <tr v-for="(major, index) in majors" :key="major.id" class="row">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ major.code }}</td>
      <td class="cell">{{ major.name }}</td>
      <td class="cell">{{ major.section.name }}</td>
      <td class="cell">{{ major.faculty.name }}</td>
    </tr>
  </table>
</template>
<script>
import { pathified } from '~/utils';
const majorsStore = pathified('majors');
export default {
  computed: {
    majors: majorsStore.$get('majors'),
  },
  async created() {
    await majorsStore.$dispatch('getListMajors');
  },
};
</script>
<style scoped lang="scss">
.major-list {
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
}
</style>
