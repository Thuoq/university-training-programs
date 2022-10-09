<template>
  <ul class="menus">
    <li v-for="menu in menus" :key="menu.name" class="list">
      <h4 :class="menu.className">{{ menu.name }}</h4>
      <ul class="children">
        <li v-for="child in menu.children" :key="child.title" class="items">
          <nuxt-link :to="child.to" :class="child.className">{{ child.title }}</nuxt-link>
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
  background-color: var(--color-gray-base);
  list-style: none;
  > .list > .header {
    list-style: none;
    background-color: var(--color-primary-lighten-1);
    color: var(--color-white);
    font-size: 16.5px;
    padding: 12px 48px 12px 25px;
    font-weight: 600;
  }
  > .list > .children > .items {
    background: var(--color-white);
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 15px;
    line-height: 18px;
    padding: 10px 10px 10px 35px;
  }
  > .list > .children > .items > .item {
    color: var(--color-back);
  }
}
</style>
