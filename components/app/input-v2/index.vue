<template>
  <div class="app-input-v2">
    <div
      class="wrapper"
      :class="{
        '-error': error,
      }"
    >
      <div v-if="label" class="labelgroup">
        <span class="label">{{ label }}</span>
        <span v-if="required" class="required">*</span>
      </div>
      <mwc-textfield
        ref="input"
        class="input"
        v-bind="$attrs"
        outlined
        :icon-trailing="icon"
        :type="type"
        :value="value"
        :disabled="disabled"
        :required="required"
        @input="updateModel"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @mousedown="onMousedown"
      />
    </div>
    <div v-for="(msg, idx) in errorMessages" :key="idx" class="msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'AppInputV2',
  props: {
    value: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    password: Boolean,
    // eslint-disable-next-line vue/require-default-prop
    icon: String,
    label: {
      type: String,
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Boolean,
      default: false,
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
  },

  computed: {
    type() {
      return this.password ? 'password' : 'text';
    },
  },

  methods: {
    updateModel(event) {
      this.$emit('input', event.target.value);
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onFocus(event) {
      this.$emit('focus', event);
    },
    onBlur(event) {
      this.$emit('blur', event);
    },
    onMousedown(event) {
      this.$emit('mousedown', event);
    },
    focus() {
      this.$refs.input?.focus();
    },
  },
};
</script>
<style lang="scss" scoped>
.app-input-v2 > .wrapper {
  font-family: 'Inter', serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
  --mdc-typography-subtitle1-font-size: 14px;
  &.-error {
    --mdc-theme-error: var(--color-error);
    --mdc-text-field-outlined-idle-border-color: var(--color-error);
    --mdc-text-field-outlined-hover-border-color: var(--color-error);
    --mdc-text-field-fill-color: var(--color-error);
    --mdc-text-field-ink-color: var(--color-error);
    --mdc-theme-primary: var(--color-error);
  }
  > .labelgroup {
    display: flex;
    align-items: center;
    column-gap: 2px;
    font-size: 14px;
  }
  > .labelgroup > .required {
    color: var(--color-error);
  }
  > .labelgroup > .label {
    color: var(--color-back);
  }
  > .input {
    height: var(--app-input-height, 40px);
    width: var(--app-input-width, 250px);
  }
}
.app-input-v2 > .msg {
  color: var(--color-error);
  text-align: right;
  font-size: 12px;
  margin: 20px 0;
}
</style>
