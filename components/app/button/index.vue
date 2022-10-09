<template>
  <mwc-button ref="button" class="app-button" @click="onClick">
    <slot />
  </mwc-button>
</template>

<script>
export default {
  name: 'AppButton',

  mounted() {
    this.appendStyleButton();
  },

  methods: {
    onClick(event) {
      this.$emit('click', event);
    },

    appendStyleButton() {
      const buttonShadowRoot = this.$refs.button.shadowRoot;
      const shadowRootStyle = document.createElement('style');
      buttonShadowRoot.append(shadowRootStyle);
      shadowRootStyle.innerHTML = `.mdc-button {
        height: var(--app-button-height, 36px)!important;
      }`;
    },
  },
};
</script>
