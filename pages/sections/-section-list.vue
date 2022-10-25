<template>
  <table class="section-list">
    <tr class="row -head">
      <th class="col">STT</th>
      <th class="col">Mã bộ môn</th>
      <th class="col">Tên bộ môn</th>
      <th class="col">Tên khoa</th>
    </tr>
    <tr v-for="(section, index) in sections" :key="section.id" class="row" @dblclick.prevent="openDialog(section)">
      <td class="cell">{{ index + 1 }}</td>
      <td class="cell">{{ section.code }}</td>
      <td class="cell">{{ section.name }}</td>
      <td class="cell">{{ section.faculty.name }}</td>
    </tr>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <section-dialog
        :isEdit="isEdit"
        :currentSection="currentSection"
        :faculties="faculties"
        @closed="closeDialog"
        @submit="onSubmit"
      ></section-dialog>
    </app-dialog>
  </table>
</template>
<script>
import SectionDialog from '~/pages/sections/-section-dialog';
import { fetchListFaculties } from '~/models/faculties.model';
import { pathified } from '~/utils';
const sectionsStore = pathified('sections');
export default {
  components: { SectionDialog },
  data() {
    return {
      visibleDialog: false,
      faculties: [],
      isEdit: true,
      currentSection: null
    };
  },
  computed: {
    sections: sectionsStore.$get('sections'),
  },
  async created() {
    await sectionsStore.$dispatch('getListSections');
  },
  methods: {
    async openDialog(section) {
      this.visibleDialog = true;
      this.currentSection = section;
      this.faculties = await fetchListFaculties();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await sectionsStore.$dispatch('updateSections', payload);
      await sectionsStore.$dispatch('getListSections');
    },
  },
};
</script>
<style scoped lang="scss">
.section-list {
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
  --mdc-shape-medium: 15px;
}
</style>
