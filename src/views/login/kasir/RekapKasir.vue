<template>
  <div id="rekapkasir">
    <headerkasir></headerkasir>
    <b-container>
      <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA REKAP SOTO SEDEEP</strong>
                </h3>
              </b-col>
            </b-row>

            <b-row class="m-t-15">
              <b-col md="12">
                <b-breadcrumb>
                  <b-breadcrumb-item>
                    <router-link :to="'dashboardkasir'">
                      <b-icon
                        icon="house-fill"
                        scale="1.25"
                        shift-v="1.25"
                        aria-hidden="true"
                      ></b-icon>
                      Dashboard
                    </router-link>
                  </b-breadcrumb-item>
                  <b-breadcrumb-item active
                    >Data Rekap Soto Sedeep</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <label style="margin-bottom:5px;">Silahkan Pilih Tanggal :</label>
                    <div>
                        <div style="display:flex">
                            <label for="tgl">Tanggal :</label>
                            <b-input-group class="mb-3" style="width:250px; margin-left:10px">
                            <b-input-group-append>
                                <b-form-datepicker
                                v-model="tanggal"
                                button-only
                                right
                                locale="en-US"
                                aria-controls="tgl"
                                
                                ></b-form-datepicker>
                            </b-input-group-append>
                            <b-form-input
                                id="tgl"
                                v-model="tanggal"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                autocomplete="off"
                            ></b-form-input>
                        </b-input-group>
                        </div>
                        <div style="margin-bottom:10px">
                            <vue-dropdown
                            :config="config"
                            @setSelectedOption="setNewSelectedOption($event);"
                            ></vue-dropdown>
                        </div>
                        
                        <b-button
                            size="sm"
                            variant="primary"
                            @click="lihatRekap"
                            class="mr-1"
                            style="margin-bottom:10px;height:38px;width:70px"
                        >
                            Lihat
                        </b-button>
                    </div>
                    
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table
                    show-empty
                    bordered
                    hover
                    ref="table"
                    :items="items"
                    :fields="fields"
                    responsive
                    style="text-align:center;"
                    >
                    </b-table>
                </b-col>
            </b-row>
            <b-row v-if="items.length">
              <b-col md="6">
                <h4 style="padding-left:10px">Total</h4>
              </b-col>
              <b-col md="6">
                <h4 style="padding-right:80px; text-align:right;">{{total}}</h4>
              </b-col>
            </b-row>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import headerkasir from "../../../components/HeaderKasir";
import moment from 'moment';
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name: "rekapkasir",
    components: {
    headerkasir,
  },
  data() {
      return {
        fields: [
            {
                key: 'namaMenu',
                label:'Nama Menu',
                sortable: true
            },
            {
                key: 'waktuPesan',
                label:'Jam Pemesanan',
                sortable: true
            },
            {
                key: 'createdAt',
                label:'Jam Pembayaran',
                sortable: true
            },
            {
                key: 'jumlah',
                label:'Jumlah',
                sortable: true
            },
            
            {
                key: 'totalHarga',
                label:'Total Harga',
                sortable: true
            },
            
            
        ],
        items: [],
        tanggal: '',
        total:0,
        config: {
            options: [
            {
                
                value: "Shift 1"
            },
            {
                value: "Shift 2"
            },
            {
                value: "Shift 3"
            }
            ],
            placeholder: "Pilih Shift",
            backgroundColor: "gray",
            textColor: "black",
            border: "1px solid black",
            width: 180
        },
      }
    },

    methods: {
        setNewSelectedOption(selectedOption) {
            this.config.placeholder = selectedOption.value;
            
        },
      lihatRekap(){
        let vm = this
        if(vm.config.placeholder == "Shift 1"){
            axios.post(ipBackend + "/rekap/listShift1",{
            tanggal : vm.tanggal,           
            },
            {
            headers: {
            accesstoken: localStorage.getItem("token"),
            }
            })
            .then((res) => {
                console.log(res.data, "ini resnya bos")
                vm.items = res.data[0];
                vm.items.forEach((element, index) => {
                  let tgl = moment(res.data[0][index].createdAt).format("DD-MMMM HH:mm:ss")
                  let tgl1 = moment(res.data[0][index].waktuPesan).format("DD-MMMM HH:mm:ss")
                  vm.items[index].waktuPesan = tgl1
                  vm.items[index].createdAt = tgl
                vm.total+=vm.items[index].totalHarga
                });
            })
            .catch((err) => {
                console.log(err);
            });
            vm.total=0
        }
        else if(vm.config.placeholder == "Shift 2"){
            axios.post(ipBackend + "/rekap/listShift2",{
            tanggal : vm.tanggal,           
            },
            {
            headers: {
            accesstoken: localStorage.getItem("token"),
            }
            })
            .then((res) => {
                console.log(res, "ini resnya bos")
                vm.items = res.data[0];
                vm.items.forEach((element, index) => {
                  let tgl = moment(res.data[0][index].createdAt).format("DD-MMMM HH:mm:ss")
                  let tgl1 = moment(res.data[0][index].waktuPesan).format("DD-MMMM HH:mm:ss")
                  vm.items[index].waktuPesan = tgl1
                  vm.items[index].createdAt = tgl
                vm.total+=vm.items[index].totalHarga
                });
            })
            .catch((err) => {
                console.log(err);
            });
            vm.total=0
        }
        else if(vm.config.placeholder == "Shift 3"){
            axios.post(ipBackend + "/rekap/listShift3",{
            tanggal : vm.tanggal,           
            },
            {
            headers: {
            accesstoken: localStorage.getItem("token"),
            }
            })
            .then((res) => {
                console.log(res, "ini resnya bos")
                vm.items = res.data[0];
                vm.items.forEach((element, index) => {
                  let tgl = moment(res.data[0][index].createdAt).format("DD-MMMM HH:mm:ss")
                  let tgl1 = moment(res.data[0][index].waktuPesan).format("DD-MMMM HH:mm:ss")
                  vm.items[index].waktuPesan = tgl1
                  vm.items[index].createdAt = tgl
                vm.total+=vm.items[index].totalHarga
                });
            })
            .catch((err) => {
                console.log(err);
            });
            vm.total=0
        }
      }
     
    }
}
</script>

<style>
    
</style>