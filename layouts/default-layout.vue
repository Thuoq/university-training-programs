<template>
  <div>
    <default-header/>
    <div class="display">
      <default-nav />
      <nuxt />
    </div>
  </div>
</template>

<script>
import defaultHeader from '~/components/Header/default-header.vue';
import defaultNav from '~/components/Navigation/default-nav.vue';
export default {
  components: {
    defaultHeader,
    defaultNav,
  },
};
</script>

<style scoped>
.display{
    display: flex;
}
</style>
