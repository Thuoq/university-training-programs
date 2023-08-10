<template>
  <h2 class="page-title">{{ title }}</h2>
</template>
<script>
export default {
  name: 'LayoutTitle',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss" scoped>
.page-title {
  background-color: var(--color-gray-base);
  font-style: normal;
  font-weight: 700;
  font-size: 16.5px;
  line-height: 20px;
  color: var(--color-back);
  padding: 12px 48px 12px 25px;
}
</style>
