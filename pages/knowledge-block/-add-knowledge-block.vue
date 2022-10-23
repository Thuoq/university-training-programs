<template>
  <div class="add-row">
    <app-button raised class="btn" @click="openDialog"
      ><mwc-icon class="icon">add</mwc-icon>
      Thêm Mới
    </app-button>
    <app-dialog :visible="visibleDialog" @closed="closeDialog" @submit="onSubmit">
      <knowledge-block-dialog
        :knowledge-blocks="knowledgeBlocks"
        @submit="onSubmit"
        @closed="closeDialog"
      ></knowledge-block-dialog>
    </app-dialog>
  </div>
</template>
<script>
import KnowledgeBlockDialog from './-knowledge-block-dialog';
import { pathified } from '~/utils';
const knowledgeBlockStore = pathified('knowledge-block');
export default {
  components: { KnowledgeBlockDialog },

  data() {
    return {
      visibleDialog: false,
    };
  },
  computed: {
    knowledgeBlocks: knowledgeBlockStore.$get('knowledgeBlocks') || [],
  },
  methods: {
    async openDialog() {
      this.visibleDialog = true;
      await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await knowledgeBlockStore.$dispatch('createKnowLedgeBlock', payload);
      await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
      this.visibleDialog = false;
    },
  },
};
</script>
<style scoped lang="scss">
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
  --mdc-dialog-min-width: 650px;
  --mdc-dialog-max-height: 800px;
  --mdc-shape-medium: 15px;
}
</style>
