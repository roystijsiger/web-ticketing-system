<template>
	<router-link tag="div" :to="{path: '/task/details/' + task_id}" :class="className">
		<div class="info">
			<table>
				<tbody>
					<tr>
						<td>Created</td>
						<td>:</td>
						<td>{{create_date}}</td>
					</tr>
					<tr>
						<td>Modified</td>
						<td>:</td>
						<td>{{modified_date}}</td>
					</tr>
					<tr>
						<td>Posted by</td>
						<td>:</td>
						<td>{{users_id}}</td>
					</tr>
					<tr>
						<td colspan="3">
							<router-link tag="button" :to="{path: '/task/edit/' + task_id}">edit</router-link>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div class="content">
			<slot></slot>
		</div>
		<div class="clear"></div>
	</router-link>
</template>

<script>
	export default{
		props: ['create_date','modified_date', 'users_id','task_id','status'],
        computed:{
            className : function(){
                switch(this.status){
                    case "0":
                        return "task uncompleted";
                    case "1":
                        return "task completed";
                    default:
                        return "task";
                }
            }
        }
	}
</script>

<style scoped>
	.clear{
		clear: both;
	}

	td:first-child{
		font-weight: bold;
	}

	.task{
		text-align: left;
		border: 1px solid #5FA6AA;
		background-color: #fff;
		width: 960px;
		margin: 10px auto;
	}

	.task:hover{
		cursor: pointer;
	}

	.task .info{
		float: left;
		padding: 5px;
		width: 30%;
		background-color: #5FA6AA;
	}

	.task .content{
		padding: 5px;
		float: right;
		width: 70%;
	}

    .task.uncompleted{
        border: 1px solid #AA5F5F;
        
    }

    .task.uncompleted .info{
        background-color: #AA5F5F;
    }

    .task.completed{
        border: 1px solid #63AA5F;
    }

    .task.completed .info{
        background-color: #63AA5F;
    }
</style>