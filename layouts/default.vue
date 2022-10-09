<template>
  <div class="wrapper">
    <app-spinner v-if="isLoading"></app-spinner>
    <layout-header v-if="currentUser" />
    <div class="display">
      <layout-sidebar v-if="currentUser" class="sidebar" />
      <nuxt class="nuxt-container" />
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

<style scoped lang="scss">
.wrapper {
  > .display {
    display: flex;
  }
  > .display > .nuxt-container {
    width: 100%;
    background-color: var(--color-white);
  }
  > .display > .sidebar {
    flex-basis: 25%;
    height: 100vh;
  }
}
</style>
