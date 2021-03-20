<template>
  <div id="lantai1" style="background-color:black">
    <b-container v-if="items.length>0">
      <b-row style="display:flex;flex-direction:row;">
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="6">
            <b-avatar button @click="onClick(201)" square size="80px" class="avatar1" :class="[(items[25][201].flagging == 1 ? kuning : ''),(items[25][201].flagging == 2 ? abang : '')]">201</b-avatar>
            <b-avatar button @click="onClick(203)" square size="80px" class="avatar1" :class="[(items[27][203].flagging == 1 ? kuning : ''),(items[27][203].flagging == 2 ? abang : '')]">203</b-avatar>
            <b-avatar button @click="onClick(205)" square size="80px" class="avatar1" :class="[(items[29][205].flagging == 1 ? kuning : ''),(items[29][205].flagging == 2 ? abang : '')]">205</b-avatar>
            <b-avatar button @click="onClick(207)" square size="80px" class="avatar1" :class="[(items[31][207].flagging == 1 ? kuning : ''),(items[31][207].flagging == 2 ? abang : '')]">207</b-avatar>
            <b-avatar button @click="onClick(209)" square size="80px" class="avatar1" :class="[(items[33][209].flagging == 1 ? kuning : ''),(items[33][209].flagging == 2 ? abang : '')]">209</b-avatar>
            <b-avatar button @click="onClick(211)" square size="80px" class="avatar1" :class="[(items[35][211].flagging == 1 ? kuning : ''),(items[35][211].flagging == 2 ? abang : '')]">211</b-avatar>
            <b-avatar button @click="onClick(213)" square size="80px" class="avatar1" :class="[(items[37][213].flagging == 1 ? kuning : ''),(items[37][213].flagging == 2 ? abang : '')]">213</b-avatar>
            <b-avatar button @click="onClick(215)" square size="80px" class="avatar1" :class="[(items[39][215].flagging == 1 ? kuning : ''),(items[39][215].flagging == 2 ? abang : '')]">215</b-avatar>
            <b-avatar button @click="onClick(217)" square size="80px" class="avatar1" :class="[(items[41][217].flagging == 1 ? kuning : ''),(items[41][217].flagging == 2 ? abang : '')]">217</b-avatar>
            <b-avatar button @click="onClick(219)" square size="80px" class="avatar1" :class="[(items[43][219].flagging == 1 ? kuning : ''),(items[43][219].flagging == 2 ? abang : '')]">219</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="6">
            <b-avatar button @click="onClick(202)" square size="80px" class="avatar1" :class="[(items[26][202].flagging == 1 ? kuning : ''),(items[26][202].flagging == 2 ? abang : '')]">202</b-avatar>
            <b-avatar button @click="onClick(204)" square size="80px" class="avatar1" :class="[(items[28][204].flagging == 1 ? kuning : ''),(items[28][204].flagging == 2 ? abang : '')]">204</b-avatar>
            <b-avatar button @click="onClick(206)" square size="80px" class="avatar1" :class="[(items[30][206].flagging == 1 ? kuning : ''),(items[30][206].flagging == 2 ? abang : '')]">206</b-avatar>
            <b-avatar button @click="onClick(208)" square size="80px" class="avatar1" :class="[(items[32][208].flagging == 1 ? kuning : ''),(items[32][208].flagging == 2 ? abang : '')]">208</b-avatar>
            <b-avatar button @click="onClick(210)" square size="80px" class="avatar1" :class="[(items[34][210].flagging == 1 ? kuning : ''),(items[34][210].flagging == 2 ? abang : '')]">210</b-avatar>
            <b-avatar button @click="onClick(212)" square size="80px" class="avatar1" :class="[(items[36][212].flagging == 1 ? kuning : ''),(items[36][212].flagging == 2 ? abang : '')]">212</b-avatar>
            <b-avatar button @click="onClick(214)" square size="80px" class="avatar1" :class="[(items[38][214].flagging == 1 ? kuning : ''),(items[38][214].flagging == 2 ? abang : '')]">214</b-avatar>
            <b-avatar button @click="onClick(216)" square size="80px" class="avatar1" :class="[(items[40][216].flagging == 1 ? kuning : ''),(items[40][216].flagging == 2 ? abang : '')]">216</b-avatar>
            <b-avatar button @click="onClick(218)" square size="80px" class="avatar1" :class="[(items[42][218].flagging == 1 ? kuning : ''),(items[42][218].flagging == 2 ? abang : '')]">218</b-avatar>
            <b-avatar button @click="onClick(220)" square size="80px" class="avatar1" :class="[(items[44][220].flagging == 1 ? kuning : ''),(items[44][220].flagging == 2 ? abang : '')]">220</b-avatar>
        </b-col>
      </b-row>
    </b-container>
   
  </div>
</template>

<script>
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:"lantai1",
    components: {
  },
  data() {
    return {
      items:[],
      abang:'abang',
      kuning:'kuning',
    }
  },
  mounted() {
      this.loadData()
  },
  sockets: {
      connect: function(){
        console.log('ada yg connect')
      },
      alldone: function(){
         this.loadData()
        console.log('refresh')
      }
    },
  methods: {
    loadData(){
      axios.get(ipBackend + "/meja/all", {
      headers: {
        accesstoken: localStorage.getItem("token"),
      },
      })
      .then((res) => {
        this.items = res.data.x;
        console.log(this.items, "ini items")

      })
      .catch((err) => {
        console.log(err);
    });
    },
    onClick(ongko){        
         let idMeja = ongko
            
            if(localStorage.getItem("role") == "waitress"){
              
              this.$router.push({ path: "/menuwaitress" });
            }
            else {
              this.$swal('Maaf Anda Bukan Waitress');
            }
            localStorage.setItem('idMeja', idMeja);
            console.log(idMeja, 'ini id meja');
    }
  }
}
</script>

<style scoped>
    .avatar1 {
        width:250px !important;
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:green;
    }
    .kuning {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        color:black;
        background-color:yellow !important;
    }
    .abang {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:red !important;
    }
    .avatar2 {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:green;
    }
    .avatar3 {
        margin:20px;
        width:200px;height:60px;
        font-size:30px;
        font-weight: bold;
    }
</style>