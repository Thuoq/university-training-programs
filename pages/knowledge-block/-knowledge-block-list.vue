<template>
  <vue-ads-table
    class="knowledge-block-list"
    :classes="classes"
    :columns="columns"
    :rows="knowledgeBlockList"
    @selection-change="onSelectionChange"
  >
    <template slot="toggle-children-icon" slot-scope="props">
      <mwc-icon class="icon">{{ props.expanded ? 'remove' : 'add' }}</mwc-icon>
    </template></vue-ads-table
  >
</template>
<script>
import { VueAdsTable } from 'vue-ads-table-tree';

export default {
  components: {
    VueAdsTable,
  },
  props: {
    knowledgeBlockList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          property: 'id',
          title: 'STT',
        },
        {
          property: 'code',
          title: 'Mã Khối kiến thức',
        },
        {
          property: 'name',
          title: 'Tên Khối kiến thức',
        },
      ],
      classes: {
        '0/': {
          head: true,
        },
        '1_/': {
          row: true,
        },
        '/1_3': {
          cell: true,
        },
      },
    };
  },
  methods: {
    onSelectionChange(val) {
      console.log(val);
    },
  },
};
</script>
<style lang="scss" scoped>
.knowledge-block-list {
  border-collapse: collapse;
  padding: 12px 50px 12px 50px;
  font-size: 16px;
}
.knowledge-block-list ::v-deep(.head) {
  background-color: #e0e5f9;
  color: var(--color-primary);
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  text-align: left;
}
.knowledge-block-list ::v-deep(.row) {
  color: var(--color-back);
  font-size: 16px;
  line-height: 24px;
  text-align: left;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.knowledge-block-list ::v-deep(.cell) {
  padding: 10px 20px;
  text-align: left;
}
.knowledge-block-list ::v-deep(.icon) {
  cursor: pointer;
}
.knowledge-block-list ::v-deep(.vue-ads-cursor-pointer) {
  display: flex;
  align-items: self-start;
}
</style>
