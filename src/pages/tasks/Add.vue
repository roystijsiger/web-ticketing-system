<template>
	<div class="add_box">
		<h1>Add task</h1>

		<label>Category:</label><br />
		<select v-model="task.category_id" v-on:change="GetTasks()">
			<option v-for="category in categories" :value="category.Id">{{category.Description}}</option>
		</select><br />
		
		<label>Users:</label><br />
		<select v-model="task.user_id" v-on:change="GetTasks()">
			<option v-for="user in users" :value="user.Id">{{user.Email}}</option>
		</select><br />

		<div id="select_parent_box" v-if="task.category_id">
			<label>Parent:</label><br />
			<select v-model="task.parent_id">
				<option value="0" selected>No parent</option>
				<option v-for="task in tasks" :value="task.Id">{{task.Description}}</option>
			</select>
		</div>
		
		<label>Description: </label><br />
		<textarea v-model="task.description"></textarea>
		<button @click="Add()">Add</button>
	</div>
</template>

<script>
import {GetCategories, GetTasksByCategory, AddTask, GetUsers} from '../../api';

export default{
	data(){
		return {
			task: {
				category_id: null,
				description: "",
				parent_id: null,
				user_id: null
			},
			categories: null,
			tasks: null,
			users: null
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

        GetUsers().then(response => {
        	this.users = response.data.users
        })
	},
	methods : {
		GetTasks(){
		 GetTasksByCategory(this.task.category_id).then(response =>{
                this.tasks = response.data.Tasks;
            }).catch(error => {
                this.$parent.error.message = error.response.data.Error.Message;
                this.$parent.error.show = true;
            })
		},
		Add(){
			if(this.task.parent_id == 0){
				this.task.parent_id = null;
			}

			AddTask(this.task.category_id,this.task.parent_id,this.task.description,this.task.user_id).then(response => {
				this.$router.go();
			})
		}
	}
}
</script>

<style scoped>
.add_box{
	width: 960px;
	border: 1px solid #5FA6AA;
	margin: 0 auto;
	padding: 10px;
	text-align: left;
}

.add_box select{
	margin-bottom: 10px;
}

.add_box textarea{
	width: 100%;
	height: 150px;
}

.add_box button{
    height: 50px;
    width: 150px;
	background-color: #5FA6AA;
	border: none;
    color: white;
    font-size: 14pt;
}
</style>