<template>
  <div class="employee-dialog">
    <h2 class="title">Nội dung Chương trình Đào tạo</h2>
    <div class="body">
      <div class="header">
        <div class="mutilselect">
          <multiselect
            v-model="knowledgeBlockList"
            :options="knowledgeBlocks"
            :multiple="true"
            :searchable="true"
            :close-on-select="false"
            :show-labels="false"
            label="name"
            track-by="name"
            placeholder="Khối kiến thức"
          ></multiselect>
        </div>
        <div class="title">
          <span class="sub">Tên CTDT:</span>
          <span class="main">{{ name }}</span>
        </div>
      </div>
      <div v-for="knowledgeBlock in knowledgeBlockList" :key="knowledgeBlock.name" class="content">
        <hr />
        <div class="title">
          <span class="sub">Học phần:</span>
          <span class="main">{{ knowledgeBlock.name }}</span>
        </div>
        <div>
          <DualListBox :source="source" :destination="destination" label="name" @onChangeList="onChangeList" />
        </div>
      </div>
    </div>
    <div class="footer">
      <app-button raised class="btn -delete" @click="onClosed">Huỷ</app-button>
      <app-button raised class="btn -save" @click="onSubmit">Lưu</app-button>
    </div>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import DualListBox from 'dual-listbox-vue';
export default {
  components: {
    Multiselect,
    DualListBox,
  },
  props: {
    currentTrainingProgram: {
      type: Object,
      default: () => {},
    },
    knowledgeBlocks: {
      type: Array,
      default: () => [],
    },
    subjects: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      name: this.currentTrainingProgram?.name || null,
      knowledgeBlockList: null,
      source: [],
      destination: this.subjects,
    };
  },
  methods: {
    onClosed() {
      this.$emit('closed');
    },
    onSubmit() {},
    onChangeList({ source, destination }) {
      console.log(this.source);
      // this.source = source.map(v => ({...v, knowledgeBlockId: this.currentId}))
      this.source = source;
      console.log(this.source);
      this.destination = destination;
    },
  },
};
</script>
<style lang="scss" scoped>
.employee-dialog {
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

  > .body {
    > .header {
      display: flex;
      margin-top: 30px;
      flex-wrap: wrap;
      justify-content: space-between;
      > .mutilselect {
        width: 30%;
        > .list {
          height: 30px;
        }
      }
      > .title {
        padding-top: 10px;
        text-align: left;
        margin-bottom: 26px;
        font-family: 'Inter';
        > .sub {
          font-size: 15px;
          color: black;
        }
        > .main {
          font-size: 16px;
          font-weight: bold;
          color: #454c8e;
          font-style: italic;
        }
      }
    }

    > .content {
      margin-top: 5px;
      > .title {
        margin-top: 10px;
        margin-bottom: 26px;
        font-family: 'Inter';
        color: black;
        > .sub {
          font-size: 15px;
        }
        > .main {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
  .footer {
    display: flex;
    justify-content: space-around;
    align-content: center;
    margin: 0px 50px 0px 50px;
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
</style>

<style src="dual-listbox-vue/dist/dual-listbox.css"></style>
