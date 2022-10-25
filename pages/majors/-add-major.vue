<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <major-dialog :sections="sections" :faculties="faculties" @closed="closeDialog" @submit="onSubmit"></major-dialog>
    </app-dialog>
  </div>
</template>
<script>
import MajorDialog from '~/pages/majors/-major-dialog';
import { fetchListSections } from '~/models/sections.model';
import { fetchListFaculties } from '~/models/faculties.model';
import { pathified } from '~/utils';
const majorStore = pathified('majors');
export default {
  components: { MajorDialog },
  data() {
    return {
      visibleDialog: false,
      sections: [],
      faculties: [],
    };
  },
  methods: {
    async openDialog() {
      this.visibleDialog = true;
      this.sections = await fetchListSections();
      this.faculties = await fetchListFaculties();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await majorStore.$dispatch('createMajors', payload);
      await majorStore.$dispatch('getListMajors');
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
  --mdc-shape-medium: 15px;
}
</style>
