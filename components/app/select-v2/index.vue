<template>
  <!-- eslint-disable -->
  <div class="app-select-v2">
    <div
      class="wrapper"
      :style="{
        '-error': error,
      }"
    >
      <div v-if="label" class="labelgroup">
        <label class="label">{{ label }}</label>
        <span v-if="required" class="required">*</span>
      </div>
      <mwc-select
        ref="select"
        outlined
        class="app-select"
        :value="value"
        :fixedMenuPosition="fixedMenu"
        @selected="onSelected"
        @opened="$emit('opened', $event)"
        @closed="$emit('closed', $event)"
        v-on="$listeners"
      >
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
    </div>
  </div>
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
      type: [Number, String],
      default: null,
    },

    disabledIndex: {
      type: Number,
      default: -1,
    },

    fixedMenu: Boolean,
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
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
          this.$emit('input', selectedItem[this.valueProp]);
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
        height: var(--app-select-height, 40px)!important;
        width: var(--app-select-width, 250px)!important;
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
.app-select-v2 > .wrapper {
  font-family: 'Inter', serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.app-select-v2 > .wrapper > .app-select {
  > .item {
    padding: 0 10px;

    &.-disabled {
      color: var(--color-disabled);
    }
  }

  &.-error {
    --mdc-select-outlined-idle-border-color: var(--color-red);
  }
}
.app-select-v2 > .wrapper {
  > .labelgroup {
    display: flex;
    align-items: center;
    column-gap: 2px;
  }
  > .labelgroup > .required {
    color: var(--color-error);
  }
  > .labelgroup > .label {
    color: var(--color-back);
  }
}
</style>
