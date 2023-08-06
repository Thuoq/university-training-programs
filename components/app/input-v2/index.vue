<template>
  <div class="app-input-v2">
    <div v-if="label" class="labelgroup">
      <label class="label">{{ label }}</label>
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
.app-input-v2 {
  font-family: 'Inter', serif;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  > .input {
    height: var(--app-input-height, 40px);
    width: var(--app-input-width, 250px);
  }
}
</style>
