<template>
  <ul class="menus">
    <li v-for="menu in menus" :key="menu.name" :class="menu.className">
      {{ menu.name }}
      <ul class="children">
        <li v-for="child in menu.children" :key="child.title" :class="child.className">
          <nuxt-link :to="child.to">{{ child.title }}</nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { SIDE_BAR_MENUS } from '~/config/menu-sidebar';
export default {
  data() {
    return {
      menus: SIDE_BAR_MENUS,
    };
  },
};
</script>
<style lang="scss" scoped>
.menus {
  list-style: none;
  > .header {
    list-style: none;
    background-color: var(--color-primary-lighten-1);
  }
}
</style>
