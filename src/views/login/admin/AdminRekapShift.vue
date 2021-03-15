<template>
  <div id="adminshift">
    <headeradmin></headeradmin>
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
                    <router-link :to="'dashboardadmin'">
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
            <b-row v-if="items1.length">
                <b-col>
                    <b-table
                    show-empty
                    bordered
                    hover
                    ref="table"
                    :items="items1"
                    :fields="fields1"
                    responsive
                    style="text-align:center;"
                    >
                    </b-table>
                </b-col>
            </b-row>
            <b-row v-if="items.length">
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
                <h4 style="padding-left:10px">Total Pemasukan</h4>
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
import headeradmin from "../../../components/HeaderAdmin";
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name: "adminshift",
    components: {
    headeradmin,
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
                key: 'totalHarga',
                label:'Total Harga',
                sortable: true
            },
            {
                key: 'jumlah',
                label:'Jumlah',
                sortable: true
            },
            
            
        ],
        fields1: [
            {
                key: 'karyawan.nama',
                label:'Nama Karyawan',
                sortable: true
            },
            {
                key: 'jumlahPelayanan',
                label:'Jumlah Melayani',
                sortable: true
            },            
        ],
        items: [],
        items1: [],
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
                vm.items1 = res.data[1]
                vm.items.forEach((element, index) => {
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
                vm.items1 = res.data[1]
                vm.items.forEach((element, index) => {
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
                vm.items1 = res.data[1]
                vm.items.forEach((element, index) => {
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