<template>
    <div>
        <p v-if="!tasks" >No open tasks. Nice job :)!</p>
        <task v-for="task in tasks" :key="task.Id" :create_date="task.Create_date" :modified_date="task.Modified_date" :users_id="task.Users_id" :task_id="task.Id" :status="task.Completed">{{task.Description}}</task>
    </div>
</template>

<script>
    import {GetTasksByCategory} from '../../api';
    import Task from '../../components/Task';
    export default{
        components: { Task },
        data(){
            return{
                tasks: null
            }
        },
        mounted(){
            GetTasksByCategory(this.$route.params.category_id).then(response =>{
                this.tasks = response.data.Tasks;
            }).catch(error => {
                this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
            })
            
        }
    }
</script>

<style scoped>
    button{
        height: 50px;
        width: 150px;
        background-color: #5FA6AA;
        border: none;
        color: white;
        font-size: 14pt;
    }
</style>