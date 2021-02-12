<template>
  <div id="lantai1" style="background-color:black">
    <b-container>
      <b-row style="display:flex;flex-direction:row;">
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="6">
            <b-avatar button @click="onClick(26)" square size="80px" class="avatar1" :class="[(items[25][26].flagging == 1 ? kuning : ''),(items[25][26].flagging == 2 ? abang : '')]">A1</b-avatar>
            <b-avatar button @click="onClick(28)" square size="80px" class="avatar1" :class="[(items[27][28].flagging == 1 ? kuning : ''),(items[27][28].flagging == 2 ? abang : '')]">A3</b-avatar>
            <b-avatar button @click="onClick(30)" square size="80px" class="avatar1" :class="[(items[29][30].flagging == 1 ? kuning : ''),(items[29][30].flagging == 2 ? abang : '')]">A5</b-avatar>
            <b-avatar button @click="onClick(32)" square size="80px" class="avatar1" :class="[(items[31][32].flagging == 1 ? kuning : ''),(items[31][32].flagging == 2 ? abang : '')]">A7</b-avatar>
            <b-avatar button @click="onClick(34)" square size="80px" class="avatar1" :class="[(items[33][34].flagging == 1 ? kuning : ''),(items[33][34].flagging == 2 ? abang : '')]">A9</b-avatar>
            <b-avatar button @click="onClick(36)" square size="80px" class="avatar1" :class="[(items[35][36].flagging == 1 ? kuning : ''),(items[35][36].flagging == 2 ? abang : '')]">A11</b-avatar>
            <b-avatar button @click="onClick(38)" square size="80px" class="avatar1" :class="[(items[37][38].flagging == 1 ? kuning : ''),(items[37][38].flagging == 2 ? abang : '')]">A13</b-avatar>
            <b-avatar button @click="onClick(40)" square size="80px" class="avatar1" :class="[(items[39][40].flagging == 1 ? kuning : ''),(items[39][40].flagging == 2 ? abang : '')]">A15</b-avatar>
            <b-avatar button @click="onClick(42)" square size="80px" class="avatar1" :class="[(items[41][42].flagging == 1 ? kuning : ''),(items[41][42].flagging == 2 ? abang : '')]">A17</b-avatar>
            <b-avatar button @click="onClick(44)" square size="80px" class="avatar1" :class="[(items[43][44].flagging == 1 ? kuning : ''),(items[43][44].flagging == 2 ? abang : '')]">A18</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="6">
            <b-avatar button @click="onClick(27)" square size="80px" class="avatar1" :class="[(items[26][27].flagging == 1 ? kuning : ''),(items[26][27].flagging == 2 ? abang : '')]">A2</b-avatar>
            <b-avatar button @click="onClick(29)" square size="80px" class="avatar1" :class="[(items[28][29].flagging == 1 ? kuning : ''),(items[28][29].flagging == 2 ? abang : '')]">A4</b-avatar>
            <b-avatar button @click="onClick(31)" square size="80px" class="avatar1" :class="[(items[30][31].flagging == 1 ? kuning : ''),(items[30][31].flagging == 2 ? abang : '')]">A6</b-avatar>
            <b-avatar button @click="onClick(33)" square size="80px" class="avatar1" :class="[(items[32][33].flagging == 1 ? kuning : ''),(items[32][33].flagging == 2 ? abang : '')]">A8</b-avatar>
            <b-avatar button @click="onClick(35)" square size="80px" class="avatar1" :class="[(items[34][35].flagging == 1 ? kuning : ''),(items[34][35].flagging == 2 ? abang : '')]">A10</b-avatar>
            <b-avatar button @click="onClick(37)" square size="80px" class="avatar1" :class="[(items[36][37].flagging == 1 ? kuning : ''),(items[36][37].flagging == 2 ? abang : '')]">A12</b-avatar>
            <b-avatar button @click="onClick(39)" square size="80px" class="avatar1" :class="[(items[38][39].flagging == 1 ? kuning : ''),(items[38][39].flagging == 2 ? abang : '')]">A14</b-avatar>
            <b-avatar button @click="onClick(41)" square size="80px" class="avatar1" :class="[(items[40][41].flagging == 1 ? kuning : ''),(items[40][41].flagging == 2 ? abang : '')]">A16</b-avatar>
            <b-avatar button @click="onClick(43)" square size="80px" class="avatar1" :class="[(items[42][43].flagging == 1 ? kuning : ''),(items[42][43].flagging == 2 ? abang : '')]">A18</b-avatar>
            <b-avatar button @click="onClick(45)" square size="80px" class="avatar1" :class="[(items[44][45].flagging == 1 ? kuning : ''),(items[44][45].flagging == 2 ? abang : '')]">A20</b-avatar>
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
            localStorage.setItem('idMeja', idMeja);
            this.$router.push({ path: "/menuwaitress" });
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