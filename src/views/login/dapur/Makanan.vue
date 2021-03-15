<template>
  <div id="dapurmakanan">
      <headerdapur></headerdapur>
      <b-container fluid>
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
                <b-table
                  show-empty
                  borderless
                  hover
                  ref="table"
                  :items="items"
                  :fields="fields"
                  
                  style='font-size:25px; width:100%; text-align:center; !important'
                >
                  <template v-slot:cell(actions)="row">
                    <b-button
                      size="lg"
                      variant="primary"
                      @click="kirimKasir(row.item, row.index, $event.target)"
                      class="mr-1"
                    >
                      Done
                    </b-button>
                    <b-button
                      size="lg"
                      variant="danger"
                      @click="handleClick(row.item, row.index, $event.target)"
                      class="mr-1"
                    >
                      Cancel
                    </b-button>               
                  </template>
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
    name: "dapurmakanan",
    components: {
    headerdapur,
    },
    data(){
        return {
            fields: [
                {
                    key: 'mejaId',
                    label:'Nomor Meja',
                    
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
      },

    },
    methods: {
      loadData(){
        let vm = this;
        axios.get(ipBackend + "/temporary/listByJenis/makanan")
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
      kirimKasir(a,b){
        let menu = a
        let vm = this;
       
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
            }
    }
}
</script>

<style>

</style>