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
        width: 960px;
        margin: 10px auto;
    }

    .category:hover{
        cursor: pointer;
    }
</style>