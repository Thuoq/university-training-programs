<template>
  <div class="major-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã ngành học</th>
          <th class="col">Tên ngành học</th>
          <th class="col">Bộ môn</th>
          <th class="col">Khoa</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(major, index) in majors" :key="major.id" class="row" @dblclick.prevent="openDialog(major)">
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ major.code }}</td>
          <td class="cell">{{ major.name }}</td>
          <td class="cell">{{ major.section.name }}</td>
          <td class="cell">{{ major.faculty.name }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <major-dialog
          :isEdit="isEdit"
          :currentMajor="currentMajor"
          :sections="sections"
          :faculties="faculties"
          @closed="closeDialog"
          @submit="onSubmit"
        ></major-dialog>
      </app-dialog>
    </table>
  </div>
</template>
<script>
import MajorDialog from '~/pages/majors/-major-dialog';
import { fetchListSections } from '~/models/sections.model';
import { fetchListFaculties } from '~/models/faculties.model';
import { pathified } from '~/utils';
const majorsStore = pathified('majors');
export default {
  components: { MajorDialog },
  data() {
    return {
      visibleDialog: false,
      isEdit: true,
      currentMajor: null,
      sections: [],
      faculties: [],
    };
  },
  computed: {
    majors: majorsStore.$get('majors'),
  },
  async created() {
    await majorsStore.$dispatch('getListMajors');
  },
  methods: {
    async openDialog(major) {
      this.visibleDialog = true;
      this.currentMajor = major;
      this.sections = await fetchListSections();
      this.faculties = await fetchListFaculties();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await majorsStore.$dispatch('updateMajors', payload);
      await majorsStore.$dispatch('getListMajors');
    },
  },
};
</script>
<style scoped lang="scss">
.major-list {
  height: 60vh;
  overflow: auto;
  > .table {
    border-collapse: collapse;
    padding: 12px 48px 12px 25px;
    font-size: 16px;
    width: 100%;
  }
  --mdc-shape-medium: 15px;
}
.major-list > .table > .head {
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
.major-list > .table > .body > .row {
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
