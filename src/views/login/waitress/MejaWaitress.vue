<template>
  <div id="mejawaitress" style="background-color:black">
    <headerwaitress></headerwaitress>
    <b-container>
      <b-row style="display:flex;flex-direction:row;">
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick" value="1" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[0].flagging == 1 ? kuning : ''),(items[0].flagging == 2 ? abang : '')]">1</b-avatar>
            <b-avatar button @click="onClick" value="2" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[1].flagging == 1 ? kuning : ''),(items[1].flagging == 2 ? abang : '')]">2</b-avatar>
            <b-avatar button @click="onClick" value="3" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[2].flagging == 1 ? kuning : ''),(items[2].flagging == 2 ? abang : '')]">3</b-avatar>
            <b-avatar button @click="onClick" value="4" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[3].flagging == 1 ? kuning : ''),(items[3].flagging == 2 ? abang : '')]">4</b-avatar>
            <b-avatar button @click="onClick" value="5" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[4].flagging == 1 ? kuning : ''),(items[4].flagging == 2 ? abang : '')]">5</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick" value="10" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[9].flagging == 1 ? kuning : ''),(items[9].flagging == 2 ? abang : '')]">10</b-avatar>
            <b-avatar button @click="onClick" value="9" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[8].flagging == 1 ? kuning : ''),(items[8].flagging == 2 ? abang : '')]">9</b-avatar>
            <b-avatar button @click="onClick" value="8" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[7].flagging == 1 ? kuning : ''),(items[7].flagging == 2 ? abang : '')]">8</b-avatar>
            <b-avatar button @click="onClick" value="7" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[6].flagging == 1 ? kuning : ''),(items[6].flagging == 2 ? abang : '')]">7</b-avatar>
            <b-avatar button @click="onClick" value="6" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[5].flagging == 1 ? kuning : ''),(items[5].flagging == 2 ? abang : '')]">6</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            
            <b-avatar button @click="onClick" value="11" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[10].flagging == 1 ? kuning : ''),(items[10].flagging == 2 ? abang : '')]">11</b-avatar>
            <b-avatar button @click="onClick" value="12" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[11].flagging == 1 ? kuning : ''),(items[11].flagging == 2 ? abang : '')]">12</b-avatar>
            <b-avatar button @click="onClick" value="13" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[12].flagging == 1 ? kuning : ''),(items[12].flagging == 2 ? abang : '')]">13</b-avatar>
            <b-avatar button @click="onClick" value="14" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[13].flagging == 1 ? kuning : ''),(items[13].flagging == 2 ? abang : '')]">14</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick" value="17" v-model="idMeja" size="80px" class="avatar1" :class="[(items[16].flagging == 1 ? kuning : ''),(items[16].flagging == 2 ? abang : '')]">17</b-avatar>
            <b-avatar button @click="onClick" value="16" v-model="idMeja" size="80px" class="avatar1" :class="[(items[15].flagging == 1 ? kuning : ''),(items[15].flagging == 2 ? abang : '')]">16</b-avatar>
            <b-avatar button @click="onClick" value="15" v-model="idMeja" size="200px" class="avatar2" style="width:100px" :class="[(items[14].flagging == 1 ? kuning : ''),(items[14].flagging == 2 ? abang : '')]">15</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick" value="18" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[17].flagging == 1 ? kuning : ''),(items[17].flagging == 2 ? abang : '')]">18</b-avatar>
            <b-avatar button @click="onClick" value="19" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[18].flagging == 1 ? kuning : ''),(items[18].flagging == 2 ? abang : '')]">19</b-avatar>
            <b-avatar button @click="onClick" value="20" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[19].flagging == 1 ? kuning : ''),(items[19].flagging == 2 ? abang : '')]">20</b-avatar>
            <b-avatar button @click="onClick" value="21" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[20].flagging == 1 ? kuning : ''),(items[20].flagging == 2 ? abang : '')]">21</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick" value="25" v-model="idMeja" square size="80px" class="avatar1" :class="[(items[24].flagging == 1 ? kuning : ''),(items[24].flagging == 2 ? abang : '')]">25</b-avatar>
            <b-avatar button @click="onClick" value="24" v-model="idMeja" square size="80px" class="avatar1" style="width:200px;height:60px;border:1;" :class="[(items[23].flagging == 1 ? kuning : ''),(items[23].flagging == 2 ? abang : '')]">24</b-avatar>
            <b-avatar button @click="onClick" value="23" v-model="idMeja" square size="80px" class="avatar1" style="width:200px;height:60px;" :class="[(items[22].flagging == 1 ? kuning : ''),(items[22].flagging == 2 ? abang : '')]">23</b-avatar>
            <b-avatar button @click="onClick" value="22" v-model="idMeja" square size="80px" class="avatar1" style="width:200px;height:60px;" :class="[(items[21].flagging == 1 ? kuning : ''),(items[21].flagging == 2 ? abang : '')]">22</b-avatar>
        </b-col>
      </b-row>
    </b-container>
   
  </div>
</template>

<script>
import headerwaitress from "../../../components/HeaderWaitress";
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:"mejawaitress",
    components: {
    headerwaitress,
  },
  data() {
    return {
      idMeja :'',
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
        this.items = res.data.respon;
        this.items.sort(function(a, b){return a.id - b.id})
        console.log(this.items, "ini items")

      })
      .catch((err) => {
        console.log(err);
    });
    }
  }
}
</script>

<style scoped>
    .avatar1 {
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
        background-color:yellow;
    }
    .abang {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:red;
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