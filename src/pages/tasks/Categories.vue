<template>
    <div>
        <h1>Categories</h1>
        <category v-for="category in categories" :key="category.Id" :category_id="category.Id">{{category.Description}}</category>
    </div>
</template>

<script>
    import {GetCategories} from '../../api';
    import Category from '../../components/Category';

    export default{
        components: {Category},
        data(){
            return{
                categories: null
            }
        },
        mounted(){
            GetCategories().then(response =>{
                this.categories = response.data.Task_categories;
            }).catch(error => {
                this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
                this.$parent.$emit('error');
            })
        }
    }
</script>