<template>
	<div>
		<h1>My Tasks <span class="open">(open)</span></h1>
		<div class="task_wrapper">
			<p v-if="!openTasks" >No open tasks. Nice job :)!</p>
			<task v-for="task in openTasks" :key="task.Id" :create_date="task.Create_date" :modified_date="task.Modified_date" :users_id="task.Users_id" :task_id="task.Id">{{task.Description}}</task>
		</div>
		<h1>My Tasks <span class="closed">(closed)</span></h1>
		<div class="task_wrapper">
			<p v-if="!closedTasks">No closed tasks. Dont you work :(!</p>
			<task v-for="task in closedTasks" :key="task.Id" :create_date="task.Create_date" :modified_date="task.Modified_date" users_id="task.Users_id" :task_id="task.Id">{{task.Description}}</task>
		</div>
	</div>
</template>

<script>
	import Task from '../components/Task'
	import {GetMyTasks} from '../api';
	export default{
		components : { Task },
		data(){
			return {
				openTasks: null,
				closedTasks: null
			}
		},
		mounted(){
			GetMyTasks().then(response=>{

				this.openTasks = response.data.Open_tasks
				this.closedTasks = response.data.Closed_tasks
			})
		}
	}
</script>

<style scoped>
	span.closed{
		color: #E67474;
	}

	span.open{
		color: #79E674;
	}
</style>