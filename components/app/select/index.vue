<template>
  <!-- eslint-disable -->
  <mwc-select ref="select" outlined class="app-select" :fixedMenuPosition="fixedMenu" @selected="onSelected">
    <mwc-list-item
      v-for="(item, index) in items"
      :key="item[valueProp]"
      class="item"
      :class="{ '-disabled': isDisabledItem(index) }"
      :value="item[valueProp]"
      :selected="isSelectedItem(item)"
      :disabled="isDisabledItem(index)"
    >
      <slot name="select-item" :item="item">
        {{ item[labelProp] }}
      </slot>
    </mwc-list-item>
  </mwc-select>
</template>

<script>
export default {
  name: 'AppSelect',

  props: {
    value: {
      type: [String, Number],
      default: null,
    },

    items: {
      type: Array,
      default: () => [],
    },

    valueProp: {
      type: String,
      default: 'value',
    },

    labelProp: {
      type: String,
      default: 'label',
    },

    modelValue: {
      type: Number,
      default: null,
    },

    disabledIndex: {
      type: Number,
      default: -1,
    },

    fixedMenu: Boolean,

    propertyName:{
      type: String,
      default: null,
    }
  },

  data() {
    return {
      selectedItem: null,
      selectedIndex: -1,
    };
  },
  watch: {
    items: {
      handler() {
        this.selectedIndex = -1;
      },
      deep: true,
    },
  },

  created() {
    this.initSelectItem();
    this.updateModelWhenSelectedChange();
  },

  mounted() {
    this.appendStyleSelect();
  },

  methods: {
    initSelectItem() {
      const matchedIndex = this.items.findIndex((item) => item[this.valueProp] === this.value);
      const isMatch = matchedIndex !== -1;
      if (isMatch) {
        this.selectedIndex = matchedIndex;
      }
    },

    isSelectedItem(item) {
      const itemValue = item[this.valueProp];

      return this.modelValue === itemValue || this.selectedItem?.[this.valueProp] === itemValue;
    },

    isDisabledItem(index) {
      const { disabled } = this.items[index];

      return this.disabledIndex > index || disabled;
    },

    updateModelWhenSelectedChange() {
      this.$watch('selectedIndex', (selectedIndex) => {
        const selectedItem = this.items[selectedIndex];
        if (selectedItem) {
          this.$emit('input', {
            value: selectedItem[this.valueProp],
            propertyName: this.propertyName || this.labelProp
          });
        }
      });
    },

    onSelected(event) {
      const { index } = event.detail;

      if (index < 0) return;

      this.selectedIndex = index;
      this.$emit('change', this.items[index]);
    },

    appendStyleSelect() {
      const selectShadowRoot = this.$refs.select.shadowRoot;
      const shadowRootStyle = document.createElement('style');
      selectShadowRoot.append(shadowRootStyle);
      shadowRootStyle.innerHTML = `.mdc-select__anchor {
        height: var(--app-select-height, 56px)!important;
        width: var(--app-select-width, 200px)!important;
      }
      .mdc-select--disabled {
        background-color: var(--app-select-disabled-background-color, #F7F7F7)!important;
      }
      `;
    },

    select(selectedIndex) {
      const { select: selectComponent } = this.$refs;

      selectComponent && selectComponent.select(selectedIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.app-select {
  > .item {
    padding: 0 10px;
  }
}
</style>
