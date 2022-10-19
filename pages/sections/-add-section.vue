<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <section-dialog :sections="sections" @closed="closeDialog" @submit="onSubmit"></section-dialog>
    </app-dialog>
  </div>
</template>
<script>
import SectionDialog from '~/pages/sections/-section-dialog';
import { fetchListSections } from '~/models/sections.model';
import { fetchListFaculties } from '~/models/faculties.model';
import { pathified } from '~/utils';
const sectionStore = pathified('sections');
export default {
  components: { SectionDialog },
  data() {
    return {
      visibleDialog: false,
      sections: [],
      faculties: [],
    };
  },
  async created() {
    this.sections = await fetchListSections();
    this.faculties = await fetchListFaculties();
  },
  methods: {
    openDialog() {
      this.visibleDialog = true;
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await sectionStore.$dispatch('createSections', payload);
      await sectionStore.$dispatch('getListSections');
    },
  },
};
</script>
<style lang="scss" scoped>
.add-row {
  padding: 12px 48px 12px 25px;
  > .btn {
    width: 200px;
    height: 36px;
    background: #d3d8ea;
    //   border: 1px solid #000000;
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-dialog-min-width: 800px;
  --mdc-dialog-max-height: 800px;
}
</style>
