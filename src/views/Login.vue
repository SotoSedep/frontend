<template>
  <div id="login">
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="6" offset-md="3">
          <div style="display:flex;height:100vh;background-color:;align-items:center; justify-content:center;">
            <div style="width:100%; align-items:center; justify-content:center; height:400px; background-color:; padding:30px; background-color:rgba(0,0,0,0.7);border-radius:6px;color:#fff">
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
                  ></b-form-input>
                </b-form-group>
                <button  @click="signin()" style=" background-color: Transparent; color:white; font-size:20px;">Login</button>
              
              
            </div>
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
              console.log(res.data[0], res.data[2])
              localStorage.setItem('token',res.data[0].token)
              localStorage.setItem('idKaryawan',res.data[1].id)
              // console.log(localStorage)
              if(res.data.length){
                if(res.data[2].role == "admin"){
                  vm.$router.push({ path: "/dashboardadmin" });
                }
                else if(res.data[2].role == "waitress"){
                  vm.$router.push({ path: "/dashboardwaitress" });
                }
                else if(res.data[2].role == "kasir"){
                  vm.$router.push({ path: "/dashboardkasir" });
                }
                alert("Selamat anda telah login");
                
              }
              else{
                alert(res.data.message)
              }
            })
            .catch(err => {
                console.log(err, 'ini eror')
            })
        }
    }
}
</script>

<style>

</style>