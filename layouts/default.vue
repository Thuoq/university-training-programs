<template>
  <div>
    <app-spinner v-if="isLoading"></app-spinner>
    <layout-header v-if="currentUser" />
    <div class="display">
      <layout-sidebar v-if="currentUser" />
      <div class="page-name">
        <nuxt />
      </div>
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

.page-name {
  width: 100%;
}
</style>
