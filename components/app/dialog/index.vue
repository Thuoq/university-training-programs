<template>
  <mwc-dialog v-if="visible" class="app-dialog" :open="visible" v-on="listeners">
    <slot/>
  </mwc-dialog>
</template>

<script>
export default {
  name: 'AppDialog',

  props: {
    visible: Boolean,
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        closed: this.closeDialog,
      };
    },
  },

  watch: {
    visible(isVisible) {
      if (isVisible) {
        this.$emit('open');
      }
      document.querySelector('html').style.overflow = 'hidden';
    },
  },

  methods: {
    closeDialog(event) {
      if (event.bubbles) return; // Prevent event from child

      this.$emit('update:visible', false);
      this.$emit('closed', event);
    },
  },
};
</script>
