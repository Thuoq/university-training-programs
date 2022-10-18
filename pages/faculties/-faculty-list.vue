<template>
  <table class="faculties-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã Khoa</th>
      <th class="col">Tên Khoa</th>
    </tr>
    <tr v-for="(faculty, index) in faculties" :key="faculty.id" class="row">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ faculty.id }}</td>
      <td class="cell">{{ faculty.name }}</td>
    </tr>
  </table>
</template>
<script>
import { pathified } from '~/utils';
const facultiesStore = pathified('faculties');
export default {
  computed: {
    faculties: facultiesStore.$get('faculties'),
  },
  async created() {
    await facultiesStore.$dispatch('getListFaculties');
  },
};
</script>
<style scoped lang="scss">
.faculties-list {
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
