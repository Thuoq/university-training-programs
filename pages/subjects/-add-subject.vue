<template>
  <div class="add-row">
    <app-button raised class="btn" @click.prevent="openDialog">
      <mwc-icon class="icon">add</mwc-icon>
      Thêm mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <subject-dialog :subjects="subjects" @closed="closeDialog" @submit="onSubmit"></subject-dialog>
    </app-dialog>
  </div>
</template>
<script>
import SubjectDialog from '~/pages/subjects/-subject-dialog';
import { fetchListSubjects } from '~/models/subjects.model';

import { pathified } from '~/utils';
const subjectStore = pathified('subjects');
export default {
  components: { SubjectDialog },
  data() {
    return {
      visibleDialog: false,
      subjects: []
    };
  },
  methods: {
   async openDialog() {
      this.visibleDialog = true;
      this.subjects = await fetchListSubjects();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await subjectStore.$dispatch('createSubjects', payload);
      await subjectStore.$dispatch('getListSubjects');
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
    cursor: pointer;
    --mdc-theme-primary: var(--color-primary);
    --mdc-button-horizontal-padding: 10px;
  }
  --mdc-shape-medium: 15px;
  --mdc-dialog-min-width: 850px;
}
</style>
