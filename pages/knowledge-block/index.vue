<template>
  <div class="knowledge-block-page">
    <layout-title :title="title"></layout-title>
    <add-knowledge-block class="add-knowledge-block"></add-knowledge-block>

    <knowledge-block-list
      :knowledge-block-list="formatKnowledgeBlocks"
      class="knowledge-block-list"
      @openDialog="openDialog"
    ></knowledge-block-list>
    <app-dialog :visible="visibleDialog" @closed="closeDialog">
      <knowledge-block-dialog
        :is-edit="isEdit"
        :current-knowledge-block="currentKnowledgeBlock"
        :knowledge-blocks="dataKnowledgeBlocks"
        @closed="closeDialog"
        @submit="onSubmit"
        @delete="onDelete"
      ></knowledge-block-dialog>
    </app-dialog>
  </div>
</template>
<script>
import KnowledgeBlockDialog from './-knowledge-block-dialog';
import AddKnowledgeBlock from './-add-knowledge-block';
import KnowledgeBlockList from './-knowledge-block-list';
import { fetchListKnowledgeBlock } from '~/models/knowledge-block.model';
import { pathified } from '~/utils';
const knowledgeBlockStore = pathified('knowledge-block');
export default {
  components: { KnowledgeBlockList, AddKnowledgeBlock, KnowledgeBlockDialog },
  async asyncData() {
    await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
  },
  data() {
    return {
      title: 'Khối kiến thức',
      isEdit: true,
      visibleDialog: false,
      currentKnowledgeBlock: null,
      dataKnowledgeBlocks: null,
    };
  },
  computed: {
    knowledgeBlocks: knowledgeBlockStore.$get('knowledgeBlocks'),
    formatKnowledgeBlocks() {
      const prevState = JSON.parse(JSON.stringify(this.knowledgeBlocks));
      return prevState.map((state, index) => {
        state._id = ++index;
        state._hasChildren = true;
        state._showChildren = true;
        state._children = state.knowledgeChildren;
        state.knowledgeChildren.forEach((el, idx) => {
          el._id = `${state._id}.${++idx}`;
        });
        state._selectable = true;
        return state;
      });
    },
  },
  methods: {
    async openDialog(val) {
      this.visibleDialog = true;
      this.currentKnowledgeBlock = val;
      this.dataKnowledgeBlocks = await fetchListKnowledgeBlock();
    },
    closeDialog() {
      this.visibleDialog = false;
    },
    async onSubmit(payload) {
      await knowledgeBlockStore.$dispatch('updateKnowLedgeBlock', payload);
      await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
      this.visibleDialog = false;
    },
    async onDelete(payload) {
      await knowledgeBlockStore.$dispatch('deleteKnowLedgeBlock', payload);

      await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
    },
  },
};
</script>
<style lang="scss" scoped>
.knowledge-block-page {
  .add-knowledge-block {
    text-align: right;
    margin-top: 40px;
    margin-bottom: 54px;
  }
  > .knowledge-block-list {
    width: 100%;
  }
}
</style>
