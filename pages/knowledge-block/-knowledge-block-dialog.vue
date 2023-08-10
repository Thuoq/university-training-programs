<template>
  <div class="knowledge-block-dialog">
    <h2 class="title">{{ title }}</h2>
    <form class="formgroup" @submit.prevent="onSubmit">
      <app-select-v2
        id="parent"
        v-model="knowledgeParentId"
        value-prop="id"
        label-prop="name"
        class="row"
        label="Khối kiến thức cha"
        :model-value="knowledgeParentId"
        :items="knowledgeBlocks || []"
      >
      </app-select-v2>

      <app-input-v2
        v-model="code"
        label="Mã Khối kiến thức"
        required
        class="row"
        :error="$v.code.$error"
        :error-messages="$validationError.code"
        @input="$v.code.$touch()"
        @blur="$v.code.$touch()"
      >
      </app-input-v2>

      <app-input-v2
        v-model="name"
        label="Tên Khối kiến thức"
        required
        class="row"
        :error="$v.name.$error"
        :error-messages="$validationError.name"
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      >
      </app-input-v2>
    </form>
    <div class="footer">
      <div class="cancel">
        <app-button
          v-if="isEdit"
          :disabled="!currentKnowledgeBlock[0]?.canDelete"
          raised
          class="btn -delete"
          @click="onDelete"
          >Xoá</app-button
        >
      </div>
      <div class="submit">
        <app-button raised class="btn -close" @click="onClosed">Huỷ</app-button>
        <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
      </div>
    </div>
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators';
export default {
  props: {
    knowledgeBlocks: {
      type: Array,
      default: () => [],
    },
    currentKnowledgeBlock: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      code: this.currentKnowledgeBlock[0]?.code || '',
      knowledgeParentId: this.currentKnowledgeBlock[0]?.knowledgeParentId || 0,
      name: this.currentKnowledgeBlock[0]?.name || '',
    };
  },
  computed: {
    isEdit() {
      return !!this.currentKnowledgeBlock[0];
    },
    title() {
      return !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa';
    },
  },
  validations: {
    code: {
      required,
      minLength: minLength(4),
    },
    name: {
      required,
    },
  },
  errorTextValidator: {
    code: {
      required: 'Mã Khối kiến thức không được để trống',
      minLength: 'Mã Khối kiến thức phải có tối thiểu từ 4 kí tự trở lên!',
    },
    name: {
      required: 'Tên Khối kiến không được để trống!',
    },
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {
      const knowledgeBlock = {
        code: this.code,
        knowledgeParentId: this.knowledgeParentId,
        name: this.name,
      };
      if (this.isEdit) {
        knowledgeBlock.id = this.currentKnowledgeBlock[0].id;
      }
      const payload = knowledgeBlock;
      if (!payload.knowledgeParentId) {
        delete payload.knowledgeParentId;
      }
      this.$emit('submit', payload);
      this.$emit('closed');
    },
    onDelete() {
      this.$emit('delete', { id: this.currentKnowledgeBlock[0].id });
      this.$emit('closed');
    },
  },
};
</script>
<style lang="scss" scoped>
.knowledge-block-dialog {
  > .title {
    margin: -19px -24px 0px -24px;
    padding-top: 13px;
    padding-bottom: 10px;
    height: 27px;
    text-align: center;
    font-size: 17px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    line-height: 21px;
    color: var(--color-back);
    background: #ebebeb;
    border-bottom: 1px solid var(--color-back);
  }
  > .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.knowledge-block-dialog > .formgroup {
  padding: 13px 38px;
  --mdc-theme-primary: var(--color-primary);
  > .row {
    margin-top: 10px;
    margin-bottom: 20px;
  }
}

.app-button {
  &.-save {
    --mdc-theme-primary: var(--color-primary);
  }
  &.-close {
    --mdc-theme-primary: var(--color-gray-base);
    --mdc-theme-on-primary: var(--color-back);
  }
  &.-delete {
    --mdc-theme-primary: var(--color-error);
    --mdc-theme-on-primary: var(--color-white);
  }
}
</style>
