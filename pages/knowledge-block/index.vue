<template>
  <div class="knowledge-block-page">
    <layout-title :title="title"></layout-title>
    <add-knowledge-block class="add-knowledge-block"></add-knowledge-block>
    <knowledge-block-list class="knowledge-block-list"></knowledge-block-list>
  </div>
</template>
<script>
import AddKnowledgeBlock from './-add-knowledge-block';
import KnowledgeBlockList from './-knowledge-block-list';
export default {
  components: { KnowledgeBlockList, AddKnowledgeBlock },
  data() {
    return {
      title: 'Khối kiến thức',
    };
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
