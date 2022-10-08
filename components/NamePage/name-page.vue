<template>
    <div class="page-name">{{namePage}}</div>
</template>

<script>
import { mapState } from 'vuex';
export default{
    computed:{
        ...mapState({
            namePage: state => state.pages.namePage,
        })
    }
}
</script>


<style scoped>
.page-name {
  padding-top: 5px;
  padding-left: 16px;
  height: 38.76px;
  background-color: rgba(217, 217, 217, 0.51);
  font-size: 18.5px;
  font-weight: 'Arial';
  font-weight: 700;
}
</style>
