<template>
  <table class="knowledge-block-list">
    <thead class="head">
      <tr class="row">
        <th class="col">STT</th>
        <th class="col">Mã Khối kiến thức</th>
        <th class="col">Tên Khối kiến thức</th>
      </tr>
    </thead>
    <tbody class="body">
      <knowledge-block-item
        v-for="knowledgeBlock in knowledgeBlockList"
        :key="knowledgeBlock.code"
        :knowledge-block="knowledgeBlock"
      ></knowledge-block-item>
    </tbody>
  </table>
</template>
<script>
import KnowledgeBlockItem from '~/pages/knowledge-block/-row';
export default {
  components: { KnowledgeBlockItem },
  data() {
    return {
      knowledgeBlockList: [
        {
          id: 1,
          code: 'KT_DC',
          name: 'Giáo dục Đại cương',
        },
        {
          id: 2,
          code: 'KT_CN',
          name: 'Giáo dục Chuyên ngành',
          children: [
            {
              id: 1,
              code: 'KT_CN_CS',
              name: 'Giáo dục Chuyên ngành Cơ sở',
            },
            {
              id: 2,
              code: 'KT_CN_BB',
              name: 'Giáo dục Chuyên ngành Bắt buộc',
            },
          ],
        },
        {
          id: 3,
          code: 'KT_TD',
          name: 'Lựa chọn tự do',
          children: [
            {
              id: 4,
              code: 'KX',
              name: 'Lựa chọn2',
            },
          ],
        },
      ],
    };
  },

  methods: {
    hasChildren(l) {
      return l.children.length > 0;
    },
  },
};
</script>
<style lang="scss" scoped>
.knowledge-block-list {
  border-collapse: collapse;
  padding: 12px 48px 12px 25px;
  font-size: 16px;
  > .head > .row {
    background-color: #e0e5f9;
    color: var(--color-primary);
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
    text-align: left;
  }
  > .head > .row > .col {
    padding: 10px 0px 10px 10px;
  }
  > .body > .row {
    color: var(--color-back);
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
  > .body > .row > .cell {
    padding: 10px 20px;
    text-align: left;
    &.-parent {
      display: flex;
      cursor: pointer;
      align-items: center;
    }
  }
}
</style>
