<template>
  <div id="admingrafik">
    <b-container>
      <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA REKAP GRAFIK SOTO SEDEEP</strong>
                </h3>
              </b-col>
            </b-row>

            
            <b-row>
                <b-col>
                    <label style="margin-bottom:5px;margin-top:50px">Silahkan Pilih Tanggal :</label>
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
                    </div>
                    <div style="display:flex">
                        <div style="margin-bottom:10px">
                                <vue-dropdown
                                :config="config"
                                @setSelectedOption="setNewSelectedOption($event);"
                                ></vue-dropdown>
                        </div>
                        <div>
                            <b-button
                                size="sm"
                                variant="primary"
                                @click="lihatRekap"
                                
                                style="margin-left:10px;margin-bottom:10px;height:38px;width:70px"
                            >
                                Lihat
                            </b-button>
                        </div>
                    </div>
                </b-col>
            </b-row> 
          </div>
        </b-col>
      </b-row>
      <b-row v-if="this.lineChartData.datasets[0].data.length">
          <b-col>
              <mdb-container>
                <mdb-line-chart
                :data="lineChartData"
                :options="lineChartOptions"
                :width="1000"
                :height="300"
                ></mdb-line-chart>
            </mdb-container>
          </b-col>
      </b-row>
      <b-row v-if="this.lineChartData1.datasets[0].data.length">
          <b-col>
              <mdb-container>
                <mdb-line-chart
                :data="lineChartData1"
                :options="lineChartOptions1"
                :width="1000"
                :height="300"
                ></mdb-line-chart>
            </mdb-container>
          </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import { ipBackend } from "@/config.js";
import { mdbLineChart, mdbContainer } from "mdbvue";
import moment from 'moment';
export default {
    name: "admingrafik",
    components: {
    mdbLineChart,
    mdbContainer
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
        items: [],
        config: {
            options: [
            {   
                value: "Total Penjualan"
            },
            {
                value: "Penjualan Soto"
            },
            ],
            placeholder: "Silahkan Pilih",
            backgroundColor: "rgb(185, 185, 189)",
            textColor: "black",
            border: "1px solid black",
            width: 220
        },
        awal: '',
        akhir: '',
        total:0,
        lineChartData: {
            labels: [],
            datasets: [
                {
                label: "Total Penjualan",
                backgroundColor: "rgba(255, 99, 132, 0.1)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 0.7,
                data: []
                },
            ]
        },
        lineChartOptions: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                {
                    gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                    }
                }
                ],
                yAxes: [
                {
                    gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                    }
                }
                ]
            }
        },
        lineChartData1: {
            labels: [],
            datasets: [
                {
                label: "Soto Ayam Kampung",
                backgroundColor: "rgba(255, 99, 132, 0.1)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 0.7,
                data: []
                },
                {
                label: "Soto Daging Sapi",
                backgroundColor: "rgba(66, 133, 244, 0.1)",
                borderColor: "rgba(66, 133, 244, 1)",
                borderWidth: 0.7,
                data: []
                },
            ]
        },
        lineChartOptions1: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                {
                    gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                    }
                }
                ],
                yAxes: [
                {
                    gridLines: {
                    display: true,
                    color: "rgba(0, 0, 0, 0.1)"
                    }
                }
                ]
            }
        }
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
        setNewSelectedOption(selectedOption) {
            this.config.placeholder = selectedOption.value;
            
        },
        lihatRekap(){
            moment.locale("ID")
            let vm = this
            let penampung1 = []
            let penampung2 = []
            let penampung3 = []
            axios.post(ipBackend + "/rekap/graph",{
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
            if(vm.config.placeholder == "Total Penjualan"){
                res.data[0].forEach((element, index) => {
                    let tgl = moment(res.data[0][index].tanggal).format("DD-MMM")
                penampung1.push(tgl)
                penampung2.push(res.data[0][index].pendapatanHarian)
                });
                vm.lineChartData.labels = penampung1
                vm.lineChartData.datasets[0].data = penampung2
                // console.log(vm.lineChartData.label, 'label')
                // console.log(vm.lineChartData.datasets[0].data, 'dataaaa')
            }
            else if(vm.config.placeholder == "Penjualan Soto"){
                res.data[1].forEach((element, index) => {
                   let tgl = moment(res.data[0][index].tanggal).format("DD-MMM")
                penampung1.push(tgl)
                penampung2.push(res.data[1][index].pendapatanSotoAyam)
                });
                res.data[2].forEach((element, index) => {
                penampung3.push(res.data[2][index].pendapatanSotoSapi)
                });
                vm.lineChartData1.labels = penampung1
                vm.lineChartData1.datasets[0].data = penampung2
                vm.lineChartData1.datasets[1].data = penampung3
                // console.log(vm.lineChartData1.label, 'label')
                // console.log(vm.lineChartData1.datasets[0].data, 'data1')
                // console.log(vm.lineChartData1.datasets[1].data, 'data2')
            }
        })
        .catch((err) => {
            console.log(err);
        });
         vm.lineChartData.labels = []
         vm.lineChartData.datasets[0].data = []
        vm.lineChartData1.labels = []
        vm.lineChartData1.datasets[0].data = []
        vm.lineChartData1.datasets[1].data = []
        }
     
    }
}
</script>

<style>
    
</style>