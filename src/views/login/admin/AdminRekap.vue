<template>
  <div id="adminrekap">

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

            
            <b-row>
                <b-col>
                    <label style="margin-bottom:5px;">Silahkan Pilih Tanggal :</label>
                    <div style="display:flex;">
                        <label for="tglawal">Tanggal Awal :</label>
                        <b-input-group class="mb-3" style="width:250px; margin-left:10px">
                            <b-input-group-append>
                                <b-form-datepicker
                                v-model="awal"
                                button-only
                                right
                                locale="en-US"
                                aria-controls="tglawal"
                                
                                ></b-form-datepicker>
                            </b-input-group-append>
                            <b-form-input
                                id="tglawal"
                                v-model="awal"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                autocomplete="off"
                            ></b-form-input>
                        </b-input-group>
                        <label for="tglakhir" style=" margin-left:10px">Tanggal Akhir :</label>
                        <b-input-group class="mb-3" style="width:250px; margin-left:10px">
                            <b-input-group-append>
                                <b-form-datepicker
                                v-model="akhir"
                                button-only
                                right
                                locale="en-US"
                                aria-controls="tglakhir"
                                
                                ></b-form-datepicker>
                            </b-input-group-append>
                            <b-form-input
                                id="tglakhir"
                                v-model="akhir"
                                type="text"
                                placeholder="YYYY-MM-DD"
                                autocomplete="off"
                            ></b-form-input>
                        </b-input-group>
                        <b-button
                            size="sm"
                            variant="primary"
                            @click="lihatRekap"
                            
                            style="margin-left:10px;margin-bottom:10px;height:38px;width:70px"
                        >
                            Lihat
                        </b-button>
                    </div>
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

import axios from 'axios';
import { ipBackend } from "@/config.js";
import moment from 'moment';
export default {
    name: "adminrekap",

  data() {
      return {
        fields: [
            {
                key: 'namaMenu',
                label:'Nama Menu',
                sortable: true
            },           
            {
                key: 'totalPenjualan',
                label:'Jumlah',
                sortable: true
            },
            {
                key: 'totalPendapatan',
                label:'Total Harga',
                sortable: true
            },
            
        ],
        items: [],
        awal: '',
        akhir: '',
        total:0
      }
    },
    mounted(){
      this.getNow()
    },
    methods: {
      getNow(){
            let vm = this
            vm.awal = moment(new Date()).startOf('month').format('YYYY-MM-DD')
            vm.akhir = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            console.log(vm.tgl, 'ini tgl')
        },
      lihatRekap(){
        let vm = this
        axios.post(ipBackend + "/rekap/rekapan",{
          awal : vm.awal,
          akhir : vm.akhir,
          
        },
        {
          headers: {
          accesstoken: localStorage.getItem("token"),
        }
        })
      .then((res) => {
        
          console.log(res, "ini resnya bos")
        vm.items = res.data.respon;
        vm.items.forEach((element, index) => {
          vm.total+=(+vm.items[index].totalPendapatan)
        });
      })
      .catch((err) => {
        console.log(err);
      });
      vm.total=0
      }
     
    }
}
</script>

<style>
    
</style>