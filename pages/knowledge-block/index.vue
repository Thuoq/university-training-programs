<template>
  <div class="knowledge-block-page">
    <layout-title :title="title"></layout-title>
    <add-knowledge-block class="add-knowledge-block"></add-knowledge-block>
    <knowledge-block-list
      :knowledge-block-list="formatKnowledgeBlocks"
      class="knowledge-block-list"
    ></knowledge-block-list>
  </div>
</template>
<script>
import AddKnowledgeBlock from './-add-knowledge-block';
import KnowledgeBlockList from './-knowledge-block-list';
import { pathified } from '~/utils';
const knowledgeBlockStore = pathified('knowledge-block');
export default {
  components: { KnowledgeBlockList, AddKnowledgeBlock },
  data() {
    return {
      title: 'Khối kiến thức',
    };
  },
  computed: {
    knowledgeBlocks: knowledgeBlockStore.$get('knowledgeBlocks'),
    formatKnowledgeBlocks() {
      const prevState = JSON.parse(JSON.stringify(this.knowledgeBlocks));
      return prevState?.map((state) => {
        state._hasChildren = true;
        state._showChildren = true;
        state._children = state.knowledgeChildren;
        return state;
      });
    },
  },
  async created() {
    await knowledgeBlockStore.$dispatch('getListKnowLedgeBlock');
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
