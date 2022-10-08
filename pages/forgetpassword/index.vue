<template>
    <h1>{{namePage}}</h1>
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
    
