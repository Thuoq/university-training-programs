<template>
  <div :class="['app-input', align]">
    <label v-if="label" class="label">{{ label }}</label>
    <input :value="value" class="input" :type="nativeType" v-bind="$attrs" v-on="listeners" />
  </div>
</template>
<script>
const INPUT_EVENT = 'input';
const LABEL_ALIGNMENT = {
  top: 'top',
  left: 'left',
};
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    labelAlignment: {
      type: String,
      default: LABEL_ALIGNMENT.top,
      validator(value) {
        return Object.values(LABEL_ALIGNMENT).includes(value);
      },
    },

    value: {
      type: [String, Number],
      default: '',
    },

    password: Boolean,

    number: Boolean,
  },
  emits: [INPUT_EVENT],
  computed: {
    nativeType() {
      return this.number ? 'number' : this.password ? 'password' : 'input';
    },

    listeners() {
      return {
        ...this.$listeners,
        input: this.onInput,
      };
    },

    align() {
      return `-align${this.labelAlignment}`;
    },
  },
  methods: {
    onInput(event) {
      const { value } = event.target;
      let formattedValue = value;

      if (this.number) {
        const valueToNumber = Number(value);

        if (!isNaN(valueToNumber)) {
          formattedValue = valueToNumber;
        }
      }

      this.$emit(INPUT_EVENT, formattedValue);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-input {
  display: flex;

  > .input {
    padding: 8px 10px;
    line-height: 1;
    border: var(--border-base);
    border-radius: var(--border-radius-base);
    background-color: var(--color-white);

    &[disabled='disabled'] {
      background-color: var(--color-disabled);
    }
    @include focus;
  }
}

.app-input.-aligntop {
  flex-direction: column;

  > .label {
    margin-bottom: 8px;
    display: inline-block;
  }
}

.app-input.-alignleft {
  align-items: center;

  > .label {
    margin-right: 8px;
  }
}
</style>
