<template>
  <div id="login">
    
    <b-container>
      <b-row style="display:flex; align-items:center; height:100vh; justify-content:center;">
        <b-col md="6">
            <div style="width:100%; height:400px; background-color:; padding:30px; background-color:rgba(0,0,0,0.7);border-radius:6px;color:#fff">
              <h2 class="text-center">LOGIN</h2>
              <hr/>
            
                <b-form-group 
                label="Username" 
                >
                  <b-form-input
                    v-model="username"
                    required
                    placeholder="Enter Username"
                  ></b-form-input>
                </b-form-group>
                
                <b-form-group 
                label="Password" 
                >
                  <b-form-input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Enter Password"
                    v-on:keyup.enter="signin()"
                  ></b-form-input>
                </b-form-group>
                <button  @click="signin()" style=" background-color: Transparent; color:white; font-size:20px;">Login</button>
              
              
            </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import { ipBackend } from "@/config.js";

export default {
    name: "login",

    data (){
        return{
        username: '',
        password: ''
        
    };
  },
  methods: {
        signin(){
            let vm = this;
            axios.post(ipBackend + '/karyawan/login', {
                username:vm.username,
                password:vm.password,
                
            })
            .then(res => {
              if(res.data.length){
                localStorage.setItem('token',res.data[0].token)
                localStorage.setItem('role',res.data[2].role)
                localStorage.setItem('idKaryawan',res.data[1].id)
                if(res.data[2].role == "admin"){
                  vm.$router.push({ path: "/dashboardadmin" });
                }
                else if(res.data[2].role == "waitress"){
                  vm.$router.push({ path: "/dashboardwaitress" });
                }
                else if(res.data[2].role == "kasir"){
                  vm.$router.push({ path: "/dashboardkasir" });
                }
                
                this.$swal('Selamat Anda Telah Login');
                
              }
              else{
                this.$swal(res.data.message);
              }
              
            })
            .catch(err => {
                console.log(err, 'ini eror')
            })
        }
    }
}
</script>

<style scoped>
    #login {
      background: url("../assets/soto3.jpeg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height:100vh
    }
</style>