<template>
  <div class="search-container">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="icon"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>

    <input v-model="searchQuery" type="text" placeholder="Search..." class="search-input" @keyup.enter="handleSearch" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    handleSearch() {
      const payload = this.searchQuery;
      this.$emit('search', payload);
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-left: 25px;
}

.search-input {
  width: 100%;
  height: 36px;
}

.icon {
  height: 25px;
  width: 25px;
  margin-right: 10px;
  margin-left: 10px;
}
</style>
