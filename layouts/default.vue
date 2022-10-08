<template>
  <div>
    <app-spinner v-if="isLoading"></app-spinner>
    <layout-header v-if="currentUser" />
    <div class="display">
      <layout-sidebar v-if="currentUser" />
      <nuxt class="container" />
    </div>
  </div>
</template>

<script>
import { pathified } from '~/utils';
const layoutStore = pathified('layout');
const userStore = pathified('user');
export default {
  name: 'DefaultLayout',

  computed: {
    currentUser: userStore.$get('currentUser'),
    isLoading: layoutStore.$get('isLoading'),
  },
};
</script>

<style scoped>
.display {
  display: flex;
}

.container {
  width: 100%;
}
</style>
