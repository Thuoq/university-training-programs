<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <input v-model="searchQuery" type="text" :placeholder="placeholder" class="search-input" />
      <mwc-icon class="material-icons search-icon">search</mwc-icon>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search...',
    },
  },
  data() {
    return {
      searchQuery: '',
    };
  },
  watch: {
    searchQuery(val) {
      this.$emit('search', val);
    },
  },
};
</script>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff; /* White background color */
  border: 1px solid #ccc; /* 1px border with #ccc color */
  border-radius: 4px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
}

.search-input-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-input {
  border: none;
  padding: 12px;
  padding-left: 40px; /* Increase left padding to accommodate the icon */
  font-size: 14px;
  outline: none;
  width: 100%;
  border-radius: 4px;
}
.search-input::placeholder {
  font-style: italic;
  font-weight: 300; /* Thin font weight */
  color: #bbb;
}

.search-icon {
  --mdc-icon-size: 20px;
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: black;
}
</style>
