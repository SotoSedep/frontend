<template>
  <div id="dapur">
      
      <b-container fluid >

                <div class="card">
                    <b-card v-for="(item, index) in items" :key="index" style="margin:10px; color:white" bg-variant="dark">
                        <b-row>
                            <b-col style="display:flex;flex-direction:warp">
                                <b-row>
                                    <div>
                                        <h3 style="font-weight:bold; margin-left: 20px">{{item.mejaId}}</h3>
                                    </div>
                                    <div>
                                        <h3 style="font-weight:bold; margin-left: 20px">{{item.namaPemesan}}</h3>
                                    </div>
                                    
                                </b-row>
                                
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col>
                                <b-table
                                    dark
                                    small
                                    show-empty
                                    borderless
                                    hover
                                    ref="table"
                                    :items="item.pesanan"
                                    :fields="fields"
                                    responsive
                                >
                                <template v-slot:cell(namaMenu)="item">
                                    <p v-if="item.item.status == 0">{{item.item.namaMenu}}</p>
                                    <p  v-else class="coret">{{item.item.namaMenu}}</p>
                                </template>
                                <template v-slot:cell(jumlah)="item">
                                    <p v-if="item.item.status == 0">{{item.item.jumlah}}</p>
                                    <p  v-else class="coret">{{item.item.jumlah}}</p>
                                </template>
                                <template v-slot:cell(keterangan)="item">
                                    <p v-if="item.item.status == 0">{{item.item.keterangan}}</p>
                                    <p  v-else class="coret">{{item.item.keterangan}}</p>
                                </template>   
                                </b-table>
                            </b-col>
                        </b-row>
                    </b-card>
                </div>
      </b-container>
  </div>
</template>

<script>
import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name: "dapur",
    data(){
        return {
            fields: [
                {
                    key: 'namaMenu',
                    label:'Menu',
                    // class: 'font-weight-bold'
                },
                {
                    key: 'jumlah',
                    label:'Jumlah',
                    class:'text-center'
                },
                {
                    key: 'keterangan',
                    label:'Keterangan',
                    class:'text-center'
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
      },

    },
    methods: {
        loadData(){
            let vm = this
            axios.get(ipBackend + "/temporary/listMinuman")
            .then((res) => {
                console.log(res.data.data);
                vm.items = res.data.data
                // res.data.data.forEach((element, index) => {
                //     let x = this.items[index]
                //     x.nomor = index 
                           
                // });
                // this.items.sort(function(a, b){return b.nomor - a.nomor})
            })
            .catch((err) => {
                console.log(err);
            });
            
        },
        done(a,b){
            let menu = a
            let vm = this;
            console.log(menu.temporaryId, 'ini menuid')
            console.log(vm.items[b], 'ini mejaid')
            axios.post(ipBackend + "/temporary/update/" + menu.temporaryId, {
            status:1,
            mejaId:vm.items[b].mejaId
            })
            .then(res => {
                console.log(res)
                // this.items.sort(function(a, b){return b.nomor - a.nomor}) 
                this.$socket.emit('refresh') 
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        doneAll(a){
            
            let menu = a
            console.log(menu.mejaId, 'ini meja id');
            axios.post(ipBackend + "/temporary/updateMinumanPerMeja", {
            status:1,
            mejaId:menu.mejaId
            })
            .then(res => {
                console.log(res) 
                // this.items.sort(function(a, b){return b.nomor - a.nomor})
                this.$socket.emit('refresh') 
            })
            .catch(err => {
                console.log(err)
            })
        },
    },
}
</script>

<style scoped>
    .card {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        font-size: clamp(10px,23px,30px);
    }
    .coret {
        text-decoration: line-through;
    }
</style>