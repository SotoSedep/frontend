<template>
  <div id="lantai1" style="background-color:black">
    <b-container>
      <b-row style="display:flex;flex-direction:row;">
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick(1)" square size="80px" class="avatar1" :class="[(items[0][1].flagging == 1 ? kuning : ''),(items[0][1].flagging == 2 ? abang : '')]">1</b-avatar>
            <b-avatar button @click="onClick(2)" square size="80px" class="avatar1" :class="[(items[1][2].flagging == 1 ? kuning : ''),(items[1][2].flagging == 2 ? abang : '')]">2</b-avatar>
            <b-avatar button @click="onClick(3)" square size="80px" class="avatar1" :class="[(items[2][3].flagging == 1 ? kuning : ''),(items[2][3].flagging == 2 ? abang : '')]">3</b-avatar>
            <b-avatar button @click="onClick(4)" square size="80px" class="avatar1" :class="[(items[3][4].flagging == 1 ? kuning : ''),(items[3][4].flagging == 2 ? abang : '')]">4</b-avatar>
            <b-avatar button @click="onClick(5)" square size="80px" class="avatar1" :class="[(items[4][5].flagging == 1 ? kuning : ''),(items[4][5].flagging == 2 ? abang : '')]">5</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick(10)"  square size="80px" class="avatar1" :class="[(items[9][10].flagging == 1 ? kuning : ''),(items[9][10].flagging == 2 ? abang : '')]">10</b-avatar>
            <b-avatar button @click="onClick(9)" square size="80px" class="avatar1" :class="[(items[8][9].flagging == 1 ? kuning : ''),(items[8][9].flagging == 2 ? abang : '')]">9</b-avatar>
            <b-avatar button @click="onClick(8)" square size="80px" class="avatar1" :class="[(items[7][8].flagging == 1 ? kuning : ''),(items[7][8].flagging == 2 ? abang : '')]">8</b-avatar>
            <b-avatar button @click="onClick(7)" square size="80px" class="avatar1" :class="[(items[6][7].flagging == 1 ? kuning : ''),(items[6][7].flagging == 2 ? abang : '')]">7</b-avatar>
            <b-avatar button @click="onClick(6)" square size="80px" class="avatar1" :class="[(items[5][6].flagging == 1 ? kuning : ''),(items[5][6].flagging == 2 ? abang : '')]">6</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            
            <b-avatar button @click="onClick(11)"  square size="80px" class="avatar1" :class="[(items[10][11].flagging == 1 ? kuning : ''),(items[10][11].flagging == 2 ? abang : '')]">11</b-avatar>
            <b-avatar button @click="onClick(12)"  square size="80px" class="avatar1" :class="[(items[11][12].flagging == 1 ? kuning : ''),(items[11][12].flagging == 2 ? abang : '')]">12</b-avatar>
            <b-avatar button @click="onClick(13)"  square size="80px" class="avatar1" :class="[(items[12][13].flagging == 1 ? kuning : ''),(items[12][13].flagging == 2 ? abang : '')]">13</b-avatar>
            <b-avatar button @click="onClick(14)"  square size="80px" class="avatar1" :class="[(items[13][14].flagging == 1 ? kuning : ''),(items[13][14].flagging == 2 ? abang : '')]">14</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick(17)"  size="80px" class="avatar1" :class="[(items[16][17].flagging == 1 ? kuning : ''),(items[16][17].flagging == 2 ? abang : '')]">17</b-avatar>
            <b-avatar button @click="onClick(16)"  size="80px" class="avatar1" :class="[(items[15][16].flagging == 1 ? kuning : ''),(items[15][16].flagging == 2 ? abang : '')]">16</b-avatar>
            <b-avatar button @click="onClick(15)"  size="200px" class="avatar2" style="width:100px" :class="[(items[14][15].flagging == 1 ? kuning : ''),(items[14][15].flagging == 2 ? abang : '')]">15</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick(18)"  square size="80px" class="avatar1" :class="[(items[17][18].flagging == 1 ? kuning : ''),(items[17][18].flagging == 2 ? abang : '')]">18</b-avatar>
            <b-avatar button @click="onClick(19)"  square size="80px" class="avatar1" :class="[(items[18][19].flagging == 1 ? kuning : ''),(items[18][19].flagging == 2 ? abang : '')]">19</b-avatar>
            <b-avatar button @click="onClick(20)"  square size="80px" class="avatar1" :class="[(items[19][20].flagging == 1 ? kuning : ''),(items[19][20].flagging == 2 ? abang : '')]">20</b-avatar>
            <b-avatar button @click="onClick(21)"  square size="80px" class="avatar1" :class="[(items[20][21].flagging == 1 ? kuning : ''),(items[20][21].flagging == 2 ? abang : '')]">21</b-avatar>
        </b-col>
        <b-col style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;" md="2">
            <b-avatar button @click="onClick(25)"  square size="80px" class="avatar1" :class="[(items[24][25].flagging == 1 ? kuning : ''),(items[24][25].flagging == 2 ? abang : '')]">25</b-avatar>
            <b-avatar button @click="onClick(24)"  square size="80px" class="avatar1" style="width:200px;height:60px;border:1;" :class="[(items[23][24].flagging == 1 ? kuning : ''),(items[23][24].flagging == 2 ? abang : '')]">24</b-avatar>
            <b-avatar button @click="onClick(23)"  square size="80px" class="avatar1" style="width:200px;height:60px;" :class="[(items[22][23].flagging == 1 ? kuning : ''),(items[22][23].flagging == 2 ? abang : '')]">23</b-avatar>
            <b-avatar button @click="onClick(22)"  square size="80px" class="avatar1" style="width:200px;height:60px;" :class="[(items[21][22].flagging == 1 ? kuning : ''),(items[21][22].flagging == 2 ? abang : '')]">22</b-avatar>
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