<template>
  <div class="row-item">
    <tr
      class="row"
      :class="{
        '-parent': hasChildren(knowledgeBlock),
      }"
    >
      <td class="cell">
        <mwc-icon v-if="hasChildren(knowledgeBlock)" class="icon">add</mwc-icon>
        <span class="value">{{ knowledgeBlock.id }}</span>
      </td>
      <td class="cell">{{ knowledgeBlock.code }}</td>
      <td class="cell">{{ knowledgeBlock.name }}</td>
    </tr>
    <template v-if="hasChildren(knowledgeBlock)">
      <knowledge-block-item
        v-for="node in knowledgeBlock.children"
        :key="node.code"
        :knowledge-block="node"
      ></knowledge-block-item>
    </template>
  </div>
</template>
<script>
export default {
  name: 'KnowledgeBlockItem',
  props: {
    knowledgeBlock: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    hasChildren(knowledgeBlock) {
      return knowledgeBlock.children?.length > 0;
    },
  },
};
</script>
<style scoped lang="scss">
.row-item {
  display: table-row;
}
</style>
