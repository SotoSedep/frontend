<template>
  <div id="dapurmakanan">
      
      <b-container fluid>
          <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>PESANAN MAKANAN</strong>
                </h3>
              </b-col>
            </b-row>
            <b-row style="display:flex">
              <b-col md="8">
                <b-table
                  show-empty
                  borderless
                  hover
                  ref="table"
                  :items="items"
                  :fields="fields"
                  :tbody-tr-class="rowClass"
                  style='font-size:25px; width:100%; text-align:center; !important'
                >
                </b-table>
              </b-col>
              <b-col md="4">
                      <b-table
                        show-empty
                        borderless
                        hover
                        ref="table"
                        :items="items2"
                        :fields="fields2"
                        :tbody-tr-class="rowClass"
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

import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name: "dapurmakanan",

    data(){
        return {
            fields: [
                {
                    key: 'mejaId',
                    label:'Nomor Meja',
                    
                },
                {
                    key: 'namaMenu',
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
            fields2: [
                {
                    key: 'mejaId',
                    label:'Meja',
                    
                },
                {
                    key: 'namaMenu',
                    label:'Menu',
                    
                },               
                {
                    key: 'isDone',
                    label:'Keterangan',
                    
                },
            ],
            items: [],
            items2: []
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
      },

    },
    methods: {
      loadData(){
        let vm = this;
        axios.get(ipBackend + "/temporary/listByJenis/makanan")
      .then((res) => {
        let don = {}
        let item = {}
        let penampung = []
        let penampung2 = []
        console.log(res, 'ini res')
        if(res.data[0].length>0){
          res.data[0].forEach((element, index) => {
          if(res.data[0][index].status == 0){
            item.id = res.data[0][index].id
            item.mejaId = res.data[0][index].mejaId
            item.namaMenu = res.data[0][index].menu.namaMenu
            item.jumlah = res.data[0][index].jumlah
            item.keterangan = res.data[0][index].keterangan
            penampung.push(item)
            vm.items = penampung
            item = {}
           
          }
        }); 
        }
        else{
          vm.items= []
          
        }
        if(res.data[1].length>0){
          res.data[1].forEach((element, index) => {
            if(res.data[1][index].status == 1){
            don.mejaId = res.data[1][index].mejaId
            don.namaMenu = res.data[1][index].menu.namaMenu
            don.isDone = 'Sudah'
            penampung2.unshift(don)
            vm.items2 = penampung2
            don = {}
          } 
        });
        }else{
          vm.items2= []
          
        }
        penampung= []
        penampung2= []
        console.log(this.items2, 'ini items 2')
        console.log(this.items,"itemnya")
      })
      .catch((err) => {
        console.log(err);
      });
      },
      kirimKasir(a,b){
        let menu = a
        let vm = this;
        console.log(menu.id, 'ini menuid')
        axios.post(ipBackend + "/temporary/update/" + menu.id, {
          status:1,
          mejaId:vm.items[b].mejaId
        })
          .then(res => {
            
            vm.items.splice(b, 1);
              console.log(res) 
              this.$socket.emit('refresh') 
          })
          .catch(err => {
              console.log(err)
          })
      },
      deleteItem(a,b) {
        let menu = a
        let vm = this
              axios.post(ipBackend + "/temporary/delete/" + menu.id, {
                mejaId:vm.items[b].mejaId, 
              },
              {
                  headers: {
                    accesstoken: localStorage.getItem("token"),
                  },
              })
                .then((res) => {
                  console.log(res.data);
                  vm.$swal("berhasil");
                  vm.items.splice(b, 1);
                  this.$socket.emit('refresh') 
                })
                .catch(function (error) {
                  console.log(error);
                });
    },
    handleClick(a,b){
                this.$confirm(
                    {
                    message: `Yakin ingin menghapus?`,
                    button: {
                        no: 'Tidak',
                        yes: 'Ya'
                    },
                    /**
                     * Callback Function
                     * @param {Boolean} confirm 
                     */
                    callback: confirm => {
                        if (confirm) {
                        this.deleteItem(a,b)
                        }
                    }
                    }
                )
            },
    rowClass(item, type) {
        if (!item || type !== 'row') return
        if (item.mejaId == '1' || item.mejaId == '6' || item.mejaId == '11' || item.mejaId == '16' || item.mejaId == '21') return 'table-primary'
        if (item.mejaId == '2' || item.mejaId == '7' || item.mejaId == '12' || item.mejaId == '17' || item.mejaId == '22') return 'table-warning'
        if (item.mejaId == '3' || item.mejaId == '8' || item.mejaId == '13' || item.mejaId == '18' || item.mejaId == '23') return 'table-success'
        if (item.mejaId == '4' || item.mejaId == '9' || item.mejaId == '14' || item.mejaId == '19' || item.mejaId == '24') return 'table-secondary'
        if (item.mejaId == '5'|| item.mejaId == '10' || item.mejaId == '15' || item.mejaId == '20' || item.mejaId == '25') return 'table-danger'
      },
    }
}
</script>

<style>

</style>