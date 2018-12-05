<template>
	<div class="edit_box">
		<h1>Edit task</h1>

		<label>Category: (now: {{task.Tasks_categories_id}})</label><br />
		<select v-model="task.Tasks_categories_id" v-on:change="GetTasks()">
			<option v-for="category in categories" :value="category.Id">{{category.Id}} : {{category.Description}}</option>
		</select><br />

		<label>Users: (now: {{task.Users_id}})</label><br />
		<select v-model="task.Users_id" v-on:change="GetTasks()">
			<option v-for="user in users" :value="user.Id">{{user.Id}} : {{user.Email}}</option>
		</select><br />
		
		<div id="select_parent_box" v-if="task.category_id">
			<label>Parent:({{task.Parent_id}})</label><br />
			<select v-model="task.Parent_id">
				<option value="0" selected>No parent</option>
				<option v-for="task in tasks" :value="task.Id">{{task.Id}} : {{task.Description}}</option>
			</select>
		</div>
		
		<label>Description: </label><br />
		<textarea v-model="task.Description"></textarea>
		<button @click="Edit()">Edit</button>
	</div>
</template>

<script>
import {GetTask,GetTasksByCategory,GetUsers,GetCategories,EditTask} from '../../api'

export default{

	data(){
		return{
			task: null,
			categories: null,
			users: null,
			tasks: null
		}
	},
	mounted(){
	  	GetTask(this.$route.params.task_id).then(response =>{
            this.task = response.data.Task
        }).catch(error => {
            this.$parent.error.message = error.response.data.Error.Message
            this.$parent.error.show = true
            this.$parent.$emit('error')
        })

        GetCategories().then(response =>{
                this.categories = response.data.Task_categories;
            }).catch(error => {
                this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
        })

        GetUsers().then(response => {
        	this.users = response.data.users
        })

        GetTasksByCategory(this.task.Tasks_categories_id).then(response =>{
            this.tasks = response.data.Tasks;
        })
	},
	methods : {
		GetTasks(){
                this.$parent.$emit('error');
		 GetTasksByCategory(this.task.Tasks_categories_id).then(response =>{
                this.tasks = response.data.Tasks;
            }).catch(error => {
                this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
                this.$parent.$emit('error');
            })
		},
		Edit(){
			EditTask(this.task).then(response => {
				this.$router.push({path: '/task/details/' + this.task.Id});
			}).catch((error) => {
				this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
                this.$parent.$emit('error');
			})
		}
	}
}
</script>

<style scoped>
.edit_box{
	width: 960px;
	border: 1px solid #5FA6AA;
	margin: 0 auto;
	padding: 10px;
	text-align: left;
}

.edit_box select{
	margin-bottom: 10px;
}

.edit_box textarea{
	width: 100%;
	height: 150px;
}

.edit_box button{
    height: 50px;
    width: 150px;
	background-color: #5FA6AA;
	border: none;
    color: white;
    font-size: 14pt;
}
</style>