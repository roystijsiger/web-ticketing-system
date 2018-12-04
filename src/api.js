import axios from 'axios';

var ai = axios.create({
    baseURL: "http://localhost:80/api-ticketing-system/index.php",
    data: {
        license: "1234567899876554321",
        customer_id: "31090014"
    }
})

export function Login(email,password){
	return ai.post('users/login',{
        "Email": email,
        "Password": password
    })
}

export function Logout(){
	return ai.post('users/logout', {
		"Token": localStorage.getItem('token')
	})
}

/* task section */
export function GetMyTasks(){
	return ai.post('tasks/getMy', {
		"Token": localStorage.getItem('token')
	})
}

export function GetTask(taskId){
    return ai.post('tasks/get', {
        "Token": localStorage.getItem('token'),
        "Task_id" : taskId
    })
}

export function GetTimeSpent(taskId){
    return ai.post('tasks/getTimeSpent',{
        "Token": localStorage.getItem('token'),
        "Task_id" : taskId
    })
}

export function GetReactions(taskId){
    return ai.post('tasks/getReactions', {
        "Token": localStorage.getItem('token'),
        "Task_id": taskId
    })
}

export function AddReaction(taskId, message){
    return ai.post('tasks/addReaction', {
        "Token": localStorage.getItem('token'),
        "Task_id": taskId,
        "Message": message
    })
}

export function GetCategories(deleted = 0){
    return ai.post('tasks/getAllCategories', {
        "Token": localStorage.getItem('token'),
        "Deleted": deleted
    })
}

export function GetTasksByCategory(categoryId){
     return ai.post('tasks/getByCategory', {
        "Token": localStorage.getItem('token'),
        "Category_id": categoryId
    })
}