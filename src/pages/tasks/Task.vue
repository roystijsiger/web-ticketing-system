<template>
	<div>
        <task v-if="task" :create_date="task.Create_date" :modified_date="task.Modified_date" :task_id="task.Id" :users_id="task.Users_id">{{task.Description}}</task>

        <div class="task_content">
            <p v-if="!subTasks">No subtasks</p>
            <SubTask v-for="task in subTasks" :key="task.Id" :task_id="task.Id  ">{{task.Description}}</subtask>
        </div>
        
        <div class="task_content">
            <div class="time_spent">
                <p v-if="!timeSpent">Nobody spent time on this task yet.</p>
                <table v-if="timeSpent">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>User</th>
                            <th>Time(minutes)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="spent in timeSpent" :key="spent.Id">
                            <td>{{spent.Date_modified}}</td>
                            <td>{{spent.Users_id}}</td>
                            <td>{{spent.Time_spent / 60}}</td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div class="reactions">
                <p v-if="!reactions">
                    Nobody reacted to this ticket yet..
                </p>
                <reaction v-for="reaction in reactions" :key="reaction.Id" :users_id="reaction.Users_id" :create_date="reaction.Create_date" :modified_date="reaction.Modified_date" :modified_user="reaction.Modified_date_users_id" :message="reaction.Message">{{reaction.Message}}</reaction>
            </div>
            <div class="clear"></div>
        </div>

        <div class="reply">
            <textarea v-model="reply" ></textarea>
            <button @click="Reply();">Reply</button>
            <div class="clear"></div>
        </div>
	</div>
</template>

<script>
    import {GetTask,GetTimeSpent, GetReactions, AddReaction, GetChildren} from '../../api';
    import Task from '../../components/Task';
    import SubTask from '../../components/SubTask';
    import Reaction from '../../components/Reaction';

    export default{
        components : {Task, Reaction, SubTask},
        data(){
            return {
                task: null,
                timeSpent: null,
                reactions: null,
                reply: "",
                subTasks: null
            }
        },
        mounted(){
            this.GetCompleteTask();
        },
        methods : {
            Reply(){
                AddReaction(this.$route.params.task_id,this.reply).then(response =>{
                    console.log(response.data)
                }).catch(error => {
                    console.log(error)
                }).finally(() => {
                    this.$router.go();
                })
            },
            GetCompleteTask(){
                GetTask(this.$route.params.task_id).then(response =>{
                    this.task = response.data.Task
                }).catch(error => {
                    this.$parent.error.message = error.response.data.Error.Message
                    this.$parent.error.show = true
                    this.$parent.$emit('error')
                })

                GetChildren(this.$route.params.task_id).then(response =>{
                    this.subTasks = response.data.Tasks
                    this.$parent.$emit('error')
                }).catch(error => {})
                
 
                GetTimeSpent(this.$route.params.task_id).then(response => {
                        this.timeSpent = response.data.Time_spent
                }).catch(error => {
                        this.$parent.error.message = error.response.data.Error.Message
                        this.$parent.error.show = true
                        this.$parent.$emit('error')
                })

                GetReactions(this.$route.params.task_id).then((response) => {
                        this.reactions = response.data.Reactions
                }).catch(error => {
                        this.$parent.error.message = error.response.data.Error.Message
                        this.$parent.error.show = true
                        this.$parent.$emit('error')
                })
        }
        },
        watch: {
            '$route.params.task_id' : function(newId, oldId){
                this.task = null;
                this.timeSpent = null;
                this.reactons = null;
                this.subTasks = null;
                this.GetCompleteTask();
            }
        }
    }
</script>

<style scoped>
    .task_content{
        text-align: left;
        border: 1px solid #5FA6AA;
        background-color: #fff;
        width: 960px;
        margin: 10px auto;
    }

    .task_content .time_spent{
       float: left;
        padding: 5px;
        width: 40%;
        background-color: #5FA6AA;
        min-height: 100px;
    }

    .task_content .time_spent td,th{
        padding: 10px;
        border: 1PX solid grey;
    }

    .task_content .reactions{
       padding: 5px;
        float: right;
        width: 60%;
    }

    .clear{
        clear: both;
    }

    /* REACT */
    .reply{
        width: 960px;
        margin: 20px auto;
        padding: 5px;

        border: 1px solid #5FA6AA;
    }

    .reply textarea{
        width: 100%;
        height: 100px;
    }

    .reply button{
        height: 50px;
        width: 150px;
        background-color: #5FA6AA;
        border: none;
        color: white;
        font-size: 14pt;
    }
</style>