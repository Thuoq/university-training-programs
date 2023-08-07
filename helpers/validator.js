import { ERROR_TEXT_VALIDATOR } from '~/constants';

export function getErrorMessagesByField(field, errorTextValidator) {
  const errors = [];
  if (!this?.[field]?.$dirty) return errors;
  const propertiesValidation = Object.keys(this?.[field] || {});
  for (const validationOption of propertiesValidation) {
    const fieldValue = this?.[field];
    const validationExists = fieldValue?.[validationOption];
    const errorText = errorTextValidator?.[field]?.[validationOption];
    if (!validationExists && errorText) {
      errors.push(errorText);
    }
  }
  return errors;
}

export function getVuelidateFields(vm) {
  const params = vm?.$params || {};
  const fields = Object.keys(params);
  return fields.filter((field) => params[field] === null && typeof vm?.[field] !== 'boolean');
}

export function getErrorObjectByVuelidate(vm, errorTextValidator) {
  if (!vm) return {};
  const fields = getVuelidateFields(vm);
  return fields.reduce((result, field) => {
    const subFields = getVuelidateFields(vm?.[field]);
    if (subFields.length) {
      result[field] = getErrorObjectByVuelidate(vm?.[field], errorTextValidator);
    } else {
      result[field] = getErrorMessagesByField.call(vm, field, errorTextValidator);
    }
    return result;
  }, {});
}

export function getValidationError() {
  const errorTextValidator = {
    ...ERROR_TEXT_VALIDATOR,
    ...(this.$options.errorTextValidator || {}),
  };
  return getErrorObjectByVuelidate(this.$v, errorTextValidator);
}
