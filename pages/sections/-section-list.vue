<template>
  <div class="section-list">
    <table class="table">
      <thead class="head">
        <tr class="row -head">
          <th class="col">STT</th>
          <th class="col">Mã bộ môn</th>
          <th class="col">Tên bộ môn</th>
          <th class="col">Tên khoa</th>
        </tr>
      </thead>
      <tbody class="body">
        <tr v-for="(section, index) in sections" :key="section.id" class="row" @dblclick.prevent="openDialog(section)">
          <td class="cell">{{ index + 1 }}</td>
          <td class="cell">{{ section.code }}</td>
          <td class="cell">{{ section.name }}</td>
          <td class="cell">{{ section.faculty.name }}</td>
        </tr>
      </tbody>
      <app-dialog :visible="visibleDialog" @closed="closeDialog">
        <section-dialog
          :current-section="currentSection"
          :faculties="faculties"
          @closed="closeDialog"
          @submit="onSubmit"
          @delete="onDelete"
        ></section-dialog>
      </app-dialog>
    </table>
  </div>
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
      currentSection: null,
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
    async onDelete(payload) {
      await sectionsStore.$dispatch('onDeleteSection', payload);
      await sectionsStore.$dispatch('getListSections');
    },
  },
};
</script>
<style scoped lang="scss">
.section-list {
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
.section-list > .table > .head {
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
.section-list > .table > .body > .row {
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
