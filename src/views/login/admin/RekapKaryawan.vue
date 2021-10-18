<template>
    <div id="absensi">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA ABSENSI KARYAWAN</strong>
                            </h3>
                        </b-col>
                    </b-row>
                    
                <div style="margin-top:80px">
                      <b-row style="margin-top:20px">
                            <b-col md="4">
                            <b-form-group
                            label="Tanggal"
                            label-for="tglsearch"
                            label-cols-md="3"
                            label-align-md="right"
                            label-size="md"
                            class="mb-0"
                            
                            >
                                <b-input-group size="md">
                                    <b-input-group-append>
                                        <b-form-datepicker
                                        v-model="tanggal"
                                        button-only
                                        left
                                        locale="en-US"
                                        aria-controls="tglsearch"
                                        style="margin-bottom:10px" 
                                        ></b-form-datepicker>
                                    </b-input-group-append>
                                    <b-form-input
                                        id="tglsearch"
                                        v-model="tanggal"
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        
                        </b-row>  
                     <b-card bg-variant="light">
                        <b-table
                        show-empty
                        bordered
                        hover
                        ref="table"
                        :items="items"
                        :fields="fields"
                        responsive
                        style="text-align:center"
                        >
                        <template #cell(status)="item">
                            <b-form-checkbox
                                v-model="item.item.status"
                                name="checkbox-1"
                                @change="itikiwir(item)"
                                value= 1
                                unchecked-value= 0
                            >
                            </b-form-checkbox>               
                        </template>
                        <template #cell(stgh)="item">
                            <b-form-checkbox
                                v-model="item.item.stgh"
                                name="checkbox-1"
                                @change="itikiwir(item)"
                                value= 1
                                unchecked-value= 0
                            >
                            </b-form-checkbox>               
                        </template>
                        <template #cell(gajiKaryawan)="item">
                            <b-form-input
                                v-model="item.item.gajiKaryawan"
                                placeholder="Silahkan Isi Nominal"
                            ></b-form-input>             
                        </template>
                        <template #cell(kasbon)="item">
                            <b-form-input
                                v-model="item.item.kasbon"
                                placeholder="Silahkan Isi Nominal"
                            ></b-form-input>             
                        </template>
                        </b-table>
                    </b-card> 
                    <b-row class="m-t-30" style="margin-top:20px;">
                    <b-col md="12">
                        <b-button v-if="this.tanggal" @click="validasi()" variant="primary"
                        >Simpan Data</b-button
                        >
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
    name:'absensi',
    data(){
        return{
            tanggal:null,
            items:[],
            fields: [
                {
                key: 'nomor',
                label: "No",
                sortable: true,
                sortDirection: "desc",
                },
                {
                    key: 'nama',
                    label:'Nama',
                    sortable: true
                },
                {
                    key: 'role',
                    label: 'Jabatan',
                    sortable: true
                },
                {
                    key: 'status',
                    label: 'Check',
                    sortable: true
                },
                {
                    key: 'stgh',
                    label: 'Setengah Hari',
                    sortable: true
                },
                {
                    key: 'gajiKaryawan',
                    label: 'Gaji',
                    sortable: true
                },
                {
                    key: 'kasbon',
                    label: 'Kasbon',
                    sortable: true
                },
            ],
        }
    },
    mounted() {
        this.getKaryawan()
        this.getNow()
    },
    methods: {
        itikiwir(x){
            console.log(x)
        },
        getNow(){
            let vm = this
            vm.tgl = moment(new Date()).get('date')
            vm.bulan = moment(new Date()).get('month') + 1
            vm.tahun = moment(new Date()).get('year')
            vm.tanggal = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            console.log(vm.tgl, 'ini tgl')
        },
        simpan(){
            let vm = this
            let bulk = []
            vm.items.forEach((element,index) => {
                let x = {}
                x.absen = vm.items[index].status
                x.tanggalAbsen = moment(vm.tanggal)
                x.karyawanId = vm.items[index].id
                x.absenStghHari = vm.items[index].stgh
                x.gaji = vm.items[index].gajiKaryawan
                x.kasbon = vm.items[index].kasbon
                bulk.push(x)
            })
            // console.log(bulk,'ini bulk')
            axios.post(ipBackend + "/absensi/register", {
                bulk : bulk,
            },
            {   
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                if(res.data.message == 'data sudah ada'){
                    vm.$swal("Gagal tanggal ini sudah menginput!");
                }
                else{
                    vm.$swal("Berhasil Menginput Data");
                }
                
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getKaryawan(){
            axios.get(ipBackend + "/karyawan/all", {
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                this.items = res.data.respon
                console.log(this.items, 'ini this item')
                res.data.respon.forEach((element, index) => {
                    let x = this.items[index]
                    x.nomor = index +1
                    x.status = 0
                    x.kasbon = 0           
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        validasi(){
            this.$confirm(
                {
                message: `Apakah yakin sudah benar?`,
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
                    this.simpan()
                    }
                }
                }
            )
        },
    }
}
</script>

<style scoped>

</style>