import axios from 'axios';

var ai = axios.create({
    baseURL: "http://localhost:80/index.php",
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
		Token: localStorage.getItem('token')
	})
}