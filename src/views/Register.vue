<template>
  <div id="register">
    <b-container class="bv-example-row">
      <b-row>
        <b-col md="6" offset-md="3">
          <div style="display:flex;height:100vh;background-color:;align-items:center">
            <div style="width:100%;height:;background-color:;padding:30px;background-color:rgba(0,0,0,0.7);border-radius:6px;color:#fff">
              <h2 class="text-center">Register</h2>
              <hr/>
              
             
                <b-form-group label="Pilih Role" v-slot="{ ariaDescribedby }">
                    <b-form-radio v-model="role" :aria-describedby="ariaDescribedby" name="some-radios" value="Waitress">Waitress</b-form-radio>
                    <b-form-radio v-model="role" :aria-describedby="ariaDescribedby" name="some-radios" value="Kasir">Kasir</b-form-radio>
                </b-form-group>
                <b-form-group 
                label="Username" 
                >
                  <b-form-input
                    v-model="username"
                    required
                    placeholder="Silahkan Isi Username"
                  ></b-form-input>
                </b-form-group>
                
                <b-form-group 
                label="Password" 
                >
                  <b-form-input
                    type="password"
                    v-model="password"
                    required
                    placeholder="Silahkan Isi Password"
                  ></b-form-input>
                </b-form-group>
                <b-form-group 
                    label="Nama" 
                >
                <b-form-input
                    v-model="nama"
                    required
                    placeholder="Silahkan Isi Nama"
                ></b-form-input>
                </b-form-group>

                <b-form-group 
                    label="Alamat" 
                >
                <b-form-input
                    v-model="alamat"
                    required
                    placeholder="Silahkan Isi Alamat"
                ></b-form-input>
                </b-form-group>

                <!-- <b-form-group 
                label="Role">
                <b-form-select
                    v-model="role"
                    :options="roleop"
                    required
                ></b-form-select>
                </b-form-group> -->

                <b-form-group 
                    label="No Handphone" 
                >
                <b-form-input
                    v-model="handphone"
                    required
                    placeholder="Silahkan Isi No. Handphone"
                ></b-form-input>
                </b-form-group>

                <button @click="signup()" style=" background-color: Transparent; color:white; font-size:20px;">Register</button>
              
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
    name: "register",
    data (){
        return{
            username: '',
            password: '',
            nama: '',
            alamat: '',
            role: null,
            roleop: [{ text: 'Silahkan Pilih', value: null }, 'Waitress', 'Kasir'],
            handphone: '',
        
    };
  },
    methods: {
        signup(){
            let vm = this;
            axios.post(ipBackend + '/karyawan/register', {
                username:vm.username,
                password:vm.password,
                nama:vm.nama,
                alamat:vm.alamat,
                role:vm.role,
                handphone:vm.handphone
            })
            .then(res => {
                console.log(res.data)
                alert("Berhasil Mengisi Jawaban");
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>

<style>

</style>