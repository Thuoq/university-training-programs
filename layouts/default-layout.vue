<template>
  <div>
    <default-header/>
    <div class="display">
      <default-nav />
      <div class="page-name">
        <nuxt />
      <namePageVue />
      </div>
    </div>
  </div>
</template>

<script>
import defaultHeader from '~/components/Header/default-header.vue';
import namePageVue from '~/components/NamePage/name-page.vue';
import defaultNav from '~/components/Navigation/default-nav.vue';
export default {
  components: {
    defaultHeader,
    defaultNav,
    namePageVue,
},
};
</script>

<style scoped>
.display{
    display: flex;
}

.page-name {
  width: 100%;
}
</style>
