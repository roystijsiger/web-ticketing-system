<template>
    <router-link tag="div" class="category" :to="{path :'/task/list/' + category_id}">
        <h2><slot></slot></h2>
    </router-link>
</template>

<script>
    export default{
        props: ['category_id']
    }
</script>

<style scoped>
    .category{
        border: 1px solid #5FA6AA;
        background-color: #E0FAFC;
        width: 100%;
        margin: 10px auto;
        min-width: 360px;
    }

    .category:hover{
        cursor: pointer;
    }

    @media screen and (min-width: 960px) {
        .category{
            width: 960px;
        }
    }

    @media screen and (min-width: 1400px){
        .category{
            width: 1400px;
        }
    }
</style>