<template>
  <div id="dapursoto">
      <headerdapur></headerdapur>
      <b-container fluid>
        <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>PESANAN SOTO</strong>
                </h3>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-table
                  show-empty
                  borderless
                  hover
                  ref="table"
                  :items="items"
                  :fields="fields"
                  
                  style='font-size:25px; width:100%; text-align:center; !important'
                >
                </b-table>
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
    name: "dapursoto",
    components: {
    headerdapur,
    },
    data(){
        return {
            fields: [
                {
                    key: 'mejaId',
                    label:'No. Meja',
                    
                },
                {
                    key: 'menu.namaMenu',
                    label:'Nama Menu',
                    
                },
                {
                    key: 'jumlah',
                    label:'Jumlah',
                    
                },
                {
                    key: 'keterangan',
                    label:'Keterangan',
                    
                },
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
        console.log('refresh')
      }
    },
    methods: {
      loadData(){
        let vm = this;
        axios.get(ipBackend + "/temporary/listByJenis/soto")
      .then((res) => {
        if(res.data.respon.length>0){
          res.data.respon.forEach((element, index) => {
          if(res.data.respon[index].status == 0){
            this.items = res.data.respon
          }
        });
        }else{
          vm.items=[]
        }
        
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
    /* text-align: center; */
    font-size:25px;
  }
  table tbody tr td{
    /* width: 100%; */
    /* text-align: center; */
    font-size:25px;
  }
</style>