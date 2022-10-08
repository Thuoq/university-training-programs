<template>
  <button class="buttonClass" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>
<script>
const BUTTON_SIZE = ['small', 'normal', 'large'];

export default {
  name: 'AppButton',
  props: {
    rounded: Boolean,

    outlined: Boolean,

    size: {
      type: String,
      default: 'normal',
      validator(size) {
        return BUTTON_SIZE.includes(size);
      },
    },
  },
  computed: {
    buttonClass() {
      const buttonSizeClass = this.size === 'normal' ? '' : `-${this.size}`;

      return {
        'app-button': true,
        [buttonSizeClass]: true,
        '-rounded': this.rounded,
        '-outlined': this.outlined,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.app-button {
  padding: 12px 26px;
  line-height: 1;
  font-weight: var(--font-weight-bold);
  border: var(--border-base);
  border-radius: var(--border-radius-base);
  background-color: var(--color-primary);
  color: var(--color-white);
  text-align: center;

  &.-rounded {
    border-radius: var(--border-radius-large);
  }

  &.-small {
    padding: 8px 20px;
  }

  &.-large {
    padding: 16px 28px;
  }

  &[disabled='disabled'] {
    background-color: var(--color-gray-lighten-2);
    cursor: not-allowed;
  }

  &.-outlined {
    background-color: var(--color-white);
    border-color: var(--color-primary);
    color: var(--color-primary);

    &[disabled='disabled'] {
      border-color: var(--color-gray-lighten-2);
      color: var(--color-gray-lighten-2);
    }
  }

  &:not([disabled]) {
    cursor: pointer;
  }

  &:focus {
    opacity: 0.85;
  }
}
</style>
