<template>
  <div class="knowledge-block-dialog">
    <h2 class="title">{{ title }}</h2>
    <form class="formgroup" @submit.prevent="onSubmit">
      <div class="row">
        <label for="parent" class="label">Khối kiến thức cha</label>
        <app-select
          id="parent"
          v-model="knowledgeParentId"
          :value-prop="'id'"
          :label-prop="'name'"
          :model-value="knowledgeParentId"
          :items="knowledgeBlocks || []"
          class="input -select"
        ></app-select>
      </div>
      <div class="row">
        <label for="code" class="label">Mã Khối kiến thức <span class="required">*</span></label>
        <app-input id="code" v-model.trim="$v.code.$model" class="input" required></app-input>
      </div>
      <div v-if="$v.code.$error && !$v.code.required" class="error">Mã Khối kiến thức required</div>
      <div v-if="!$v.code.minLength" class="error">
        Mã Khối kiến ít nhất phải có {{ $v.code.$params.minLength.min }}
      </div>

      <div class="row">
        <label for="name" class="label">Tên Khối kiến thức <span class="required">*</span></label>
        <app-input id="name" v-model="$v.name.$model" required class="input"></app-input>
      </div>
      <div v-if="$v.name.$error && !$v.name.required" class="error">Tên Khối kiến thức required</div>
    </form>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" :disabled="$v.$invalid" @click="onSubmit">Lưu</app-button>
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
    isEdit: {
      type: Boolean,
    },
    currentKnowledgeBlock: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: !this.isEdit ? 'Thêm mới' : 'Chỉnh sửa',
      code: this.currentKnowledgeBlock[0]?.code || '',
      knowledgeParentId: this.currentKnowledgeBlock[0]?.knowledgeParentId ||  0,
      name: this.currentKnowledgeBlock[0]?.name || '',
    };
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
      if(this.isEdit === true){
        knowledgeBlock.id = this.currentKnowledgeBlock[0].id;
      }
      const payload = knowledgeBlock;
      if (!payload.knowledgeParentId) {
        delete payload.knowledgeParentId;
      }
      this.$emit('submit', payload);
      this.$emit('closed');
    },
  },
};
</script>
<style lang="scss" scoped>
.knowledge-block-dialog {
  > .title {
    color: var(--color-back);
    font-size: 24px;
    background-color: var(--color-gray-base);
    text-align: center;
    padding: 13px 0;
  }
  > .footer {
    display: flex;
    justify-content: space-around;
  }
  > .footer > .btn {
    &.-save {
      --mdc-theme-primary: var(--color-primary);
    }
    &.-delete {
      --mdc-theme-primary: var(--color-gray-base);
      --mdc-theme-on-primary: var(--color-back);
    }
  }
}
.knowledge-block-dialog > .formgroup {
  padding: 13px 38px;
  --mdc-theme-primary: var(--color-primary);
  > .error {
    color: red;
  }

  > .row {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  > .row > .label {
    color: var(--color-back);
  }
  > .row > .label > .required {
    color: red;
  }
  > .row > .input {
    width: 60%;
  }
}
</style>
