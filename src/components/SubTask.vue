<template>
	<router-link tag="div" class="task sub" :to="{path: '/task/details/' + task_id}">
		<slot></slot>
	</router-link>
</template>

<script>
	export default{
		props: ['task_id','description']
	}
</script>

<style scoped>
	.task.sub{
		font-size: 15pt;
		padding: 5px;
		cursor: pointer;
	}

	.task.sub:nth-child(odd){
		background-color: #E0FAFC;
	}
</style>