<template>
  <div id="menuwaitress">
      <headerwaitress></headerwaitress>
      <b-container>
            <b-row>
                <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
                <div class="box">
                    <b-row>
                    <b-col md="12">
                        <h3 class="text-center m-t-0 m-b-0">
                        <strong>Silahkan Pilih Menu</strong>
                        </h3>
                    </b-col>
                    </b-row>
                </div>
                </b-col>    
            </b-row>
            <b-row class="m-t-15">
              <b-col md="12">
                <b-breadcrumb>
                  <b-breadcrumb-item>
                    <router-link :to="'dashboardwaitress'">
                      <b-icon
                        icon="box-arrow-left"
                        scale="1.25"
                        shift-v="1.25"
                        aria-hidden="true"
                      ></b-icon>
                      Back to List
                    </router-link>
                  </b-breadcrumb-item>
                  <b-breadcrumb-item active
                    >Pilih Menu Pesanan</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>
            <b-row>
                <b-col cols lg="12">
                    <b-form-group 
                label="Nama Pemesan" 
                >
                  <b-form-input
                    v-model="pemesan"
                    required
                    placeholder="Silahkan isi Nama"
                    
                  ></b-form-input>
                </b-form-group>
                <div class="cart" v-if="itemCart.length">
                            <b-table
                            show-empty
                            bordered
                            hover
                            :items="itemCart"
                            :fields="fields"
                            responsive
                            style=" text-align:center; width:100%;"
                            >
                        
                        <template v-slot:cell(actions)="row">
                            <b-input-group>
                                <b-form-input style=" margin-bottom:10px;" type="text" placeholder="Silahkan Isi Keterangan" v-model="row.item.keterangan"></b-form-input>
                            </b-input-group>
                            <b-button
                                size="sm"
                                variant="danger"
                                @click="handleClick(row.item.id)"
                                class="mr-1"
                                >
                                Hapus
                            </b-button>
                        </template>
                        
                        </b-table>
                        <b-button v-if="this.pemesan" @click="goDapur()" variant="primary" class="m-t-15" style="width:100px;">Order</b-button>
                        <b-button v-else disabled @click="goDapur()" variant="primary" class="m-t-15" style="width:100px;">Order</b-button>
                    </div>
                    <div class="tabs">
                            <b-button variant="primary" style="margin:10px;" :class="isActive === 0? 'is-active': ''" @click="isActive = 0">Soto</b-button>
                            <b-button variant="primary" style="margin:10px;" :class="isActive === 1? 'is-active': ''" @click="isActive = 1">Makanan</b-button>
                            <b-button variant="primary" style="margin:10px;" :class="isActive === 2? 'is-active': ''" @click="isActive = 2">Minuman</b-button>
                        
                    </div>
                    <div class="content">
                        <div class="wrapper">
                            <component :is="menu[isActive]" @kirimCart="tambahkanKecart"></component>
                        </div>                      
                    </div>  
                </b-col> 
            </b-row>
            
              
      </b-container>
  </div>
</template>

<script>
import headerwaitress from "../../../components/HeaderWaitress";
import soto from "../../../components/Soto";
import makanan from "../../../components/Makanan";
import minuman from "../../../components/Minuman";
import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name:'menuwaitress',
    components: {
          headerwaitress,
        },
    data() {
        return {
            menu: [
                soto,
                makanan,
                minuman
            ],
            isActive: 0,
            pemesan:'',
            keterangan:'',
            itemCart:[],
            fields:[
                {
                    key: 'namaMenu',
                    label:'Nama Menu',

                },
                {
                    key: 'harga',
                    label: 'Harga',

                },
                {
                    key: 'jumlah',
                    label: 'Jumlah',

                },
                { key: "actions", label: "Actions" },
            ],
        
        }
        
    },
    methods: {
            tambahkanKecart(e){
                // console.log(e, "ini E")
                this.itemCart.push(e) 
                console.log(this.itemCart, "ini item")        
            },
            deleteItem(idData){
                let idDelete = this.itemCart.findIndex((o) => o.id === idData);
                  this.itemCart.splice(idDelete, 1);
            },
            goDapur(){
                let vm = this
                let items = []
                // console.log(this.itemCart, 'ini itemcart')
                vm.itemCart.forEach((item) => {
                    let menu = {
                    menuId:item.id,
                    karyawanId: localStorage.getItem("idKaryawan"),
                    mejaId: localStorage.getItem("idMeja"),
                    harga: item.harga,
                    jenis: item.jenis,
                    jumlah: item.jumlah,
                    atasNama: vm.pemesan,
                    keterangan: item.keterangan
                }
                    items.push(menu)  
                })
                console.log(items, "ini itemssssss")
                if(items.length == 0){
                    this.$swal('Silahkan Isi Orderan')
                }
                else{
                    axios.post(ipBackend + '/temporary/screening', items,
                {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    },
                })
                .then(res => {
                    console.log(res)
                    this.$swal("Pesanan Diterima");
                    // this.$socket.emit('refresh')
                    vm.$router.push({ path: "/dashboardwaitress" });
                })
                .catch(err => {
                    console.log(err)
                })
                }
                
            },
            handleClick(idData){
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
                        this.deleteItem(idData)
                        }
                    }
                    }
                )
            }
    }
    
}
</script>

<style scoped>
    #menuwaitress {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .cart {
        margin-bottom: 20px;
    }
    .wrapper {
        padding-top: 10px;
    }
</style>