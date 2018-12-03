<template>
  <div id="app">
    <header>
      <div v-if="token" id="loginBox">
        Logged in as: <br />
        {{user.First_name.substr(0, 1)}}. {{user.Middle_name}} {{user.Last_name}} <br />
        <a class="item" @click="Logout()">Logout</a>
      </div>
      <h1>Ticketing System</h1>
    </header>
    <nav>
      <router-link class="item" :to="{path: '/ticket/my'}">My Tickets</router-link>
      <router-link class="item" :to="{path: '/ticket/new'}">New ticket</router-link>
    </nav>
     <div class='error' v-if="error.show">
      <p>{{error.message}}</p>
    </div>
    <div id="login" v-if="!user">
      <input v-model="username" type="text" name="txt_username" placeholder="username.." />
      <input v-model="password" type="password" name="txt_password" placeholder="password.." />
      <button @click="Login()">Login</button>
    </div>
    <div id="content-wrapper">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {Login, Logout} from './api.js';
export default {
  name: 'app',
  data(){
    return {
      user : JSON.parse(localStorage.getItem('user')),
      token: localStorage.getItem('token'),
      username: null,
      password: null,
      error: {
        show: false,
        message: ""
      }
    }
  },
  methods : {
    Login(){
      Login(this.username, this.password).then(response => {
        console.log(response.data)
        localStorage.setItem('user', JSON.stringify(response.data.Response_data.User));
        localStorage.setItem('token', response.data.Response_data.Token)
        this.$router.go()
      }).catch(error => {
        this.error.show = true;
        this.error.message = error.response.data.Error.Message;
        console.log(error)
      })
    },
    Logout(){
      Logout()
      .then(response => {})
      .catch(error => {
        this.error.show = true;
        this.error.message = error.response.data.Error.Message;
      }).finally(() => {

        localStorage.removeItem('user')
        localStorage.removeItem('token')
        this.$router.go()
      })

        
    }
  },
  mounted(){
    console.log(this.user)
  }
}
</script>

<style>
/* app itself */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}


/* header section */
header{
  width: 100%;
  height: 100px;
  background-color: #5FA6AA;
  padding: 5px;
}

header h1{
  color: white;
  font-size: 50px;
}

#loginBox{
  float: right;
  width: 150px;
  height: 75px;
  background-color: #E0FAFC;
}

/* navigation section */
nav{
  width: 100%;
  height: 40px;
  background-color: #E0FAFC;
  padding: 12.5px;
}

nav .item{
  margin: 0 10px 0 10px;
}

/* login section */
#login{
  width: 500px;
  background-color: #E0FAFC;
  border: 1px solid #CFE7E9;
  border-radius: 2.5px;
  min-height: 100px;
  margin: 50px auto;
  padding: 5px;
}

#login input{
  width: 100%;
  height: 40px;
  margin: 5px 0 5px 0;
  padding-left: 5px;
}

#login button{
  height: 40px;
  width: 150px;
}

/* error message */
.error{
  margin: 20px auto;
  width: 960px;
  border: 1px solid #FB9393;
  background-color: #FFC8C8;
  color: white;
}

</style>
