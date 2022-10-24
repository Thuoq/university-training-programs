<template>
  <mwc-textfield
    ref="input"
    class="app-input"
    outlined
    :icon-trailing="icon"
    :type="type"
    :value="value"
    :disabled="disabled"
    @input="updateModel"
    @change="onChange"
    @focus="onFocus"
    @blur="onBlur"
    @mousedown="onMousedown"
  />
</template>

<script>
export default {
  name: 'AppInput',
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
