<template>
  <div id="sotoview">
      <headerdapur></headerdapur>
      <b-container>
        <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>PESANAN SOTO SEDEEP</strong>
                </h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <table class="table">
                  <thead>
                    <tr>
                      <th >Nomor Meja</th>
                      <th >Nama Menu</th>
                      <th >Jumlah</th>
                      <th >Keterangan</th>
                    </tr>
                  </thead>
                  <tbody >
                    <tr v-for="(item,i) in items" :key="i">
                      <td >{{ item.mejaId }}</td> 
                      <td >{{ item.menu.namaMenu}}</td>
                      <td >{{ item.jumlah}}</td> 
                      <td >{{ item.keterangan}}</td> 
                    </tr>
                  </tbody>
                </table>
              </b-col>
            </b-row>
            
            
          </div> 
        </b-col>
      </b-row>
      </b-container>
  </div>
</template>

<script>
import headerdapur from "../../../components/Headerdapur";
import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name: "sotoview",
    components: {
    headerdapur,
    },
    data(){
        return {
            fields: [
                {
                    key: 'mejaId',
                    label:'Nomor Meja',
                    sortable: true
                },
                {
                    key: 'menu.namaMenu',
                    label:'Nama Menu',
                    sortable: true
                },
                {
                    key: 'jumlah',
                    label:'Jumlah',
                    sortable: true
                },
                {
                    key: 'keterangan',
                    label:'Keterangan',
                    sortable: true
                },
                { key: "actions", label: "Actions" },
            ],
            items: [],
        }
    },
    mounted() {
        this.loadData()
    },
    sockets: {
      connect: function(){
        console.log('ada yg connect')
      },
      refresh: function(){
         this.loadData()
        
      }
    },
    methods: {
      loadData(){
        axios.get(ipBackend + "/temporary/listByJenis/soto")
      .then((res) => {
        res.data.respon.forEach((element, index) => {
          if(res.data.respon[index].status == 0){
            this.items = res.data.respon
          }
        });
        console.log(this.items,"itemnya")
      })
      .catch((err) => {
        console.log(err);
      });
      },
      
    }
}
</script>

<style scoped>

  table thead tr th{
    /* width: 100%; */
    text-align: center;
    font-size:30px;
  }
  table tbody tr td{
    /* width: 100%; */
    text-align: center;
    font-size:30px;
  }
  

</style>