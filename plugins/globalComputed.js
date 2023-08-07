import Vue from 'vue';
import { getValidationError } from '@/helpers/validator';

Vue.mixin({
  computed: {
    $validationError() {
      return getValidationError.call(this);
    },
  },
});
