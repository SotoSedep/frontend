<template>
    <div id="pembelianBanyumanik">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA PEMBELIAN BANYUMANIK</strong>
                            </h3>
                        </b-col>
                    </b-row>
                    <b-row class="m-t-30" style="margin-top:20px;margin-right:20px position: absolute; right:0">
                    <b-col md="12">
                        <b-button v-b-modal.modal-1 variant="primary"
                        >Tambah Data</b-button
                        >
                    </b-col>
                    </b-row>
                <div style="margin-top:30px">
                        
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
                                        v-model="tanggalsearch"
                                        button-only
                                        left
                                        locale="en-US"
                                        aria-controls="tglsearch"
                                        style="margin-bottom:10px" 
                                        ></b-form-datepicker>
                                    </b-input-group-append>
                                    <b-form-input
                                        id="tglsearch"
                                        v-model="tanggalsearch"
                                        type="text"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                    ></b-form-input>
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-button
                                size="md"
                                variant="primary"
                                @click="getListHarian()"
                                
                            >
                                Lihat Harian
                            </b-button>
                        </b-col>
                        <b-col md="4">
                            <b-form-group
                            label="Pilih Bulan"
                            label-for="bulansearch"
                            label-cols-md="3"
                            label-align-md="right"
                            label-size="md"
                            class="mb-0"
                            
                            >
                             <b-form-select v-model="bulan" :options="options" style="margin-bottom:5px"></b-form-select>   
                            </b-form-group>
                            <b-form-group
                            label="Pilih Tahun"
                            label-for="tahunsearch"
                            label-cols-md="3"
                            label-align-md="right"
                            label-size="md"
                            class="mb-0"
                            >
                             <b-form-select v-model="tahun" :options="options2"></b-form-select>   
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-button
                                size="md"
                                variant="primary"
                                @click="getListBulanan()"
                                style="margin-top:15px"
                            >
                                Lihat Bulanan
                            </b-button>
                        </b-col>
                        <b-col md="12" class="my-1">
                            <b-form-group
                            label="Search"
                            label-for="filter-input"
                            label-cols-sm="6"
                            label-align-sm="right"
                            label-size="sm"
                            class="mb-0"
                            style="margin-top:10px"
                            >
                                <b-input-group size="sm">
                                    <b-form-input
                                    id="filter-input"
                                    v-model="filter"
                                    type="search"
                                    placeholder="Type to Search"
                                    ></b-form-input>
                                    <b-input-group-append>
                                    <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                                    </b-input-group-append>
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
                        :current-page="currentPage"
                        :per-page="perPage"
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        
                        responsive
                        style="text-align:center"
                        >
                        
                        </b-table>
                        <b-row>
                           <b-col sm="5" md="6" class="my-1">
                                <b-form-group
                                label="Per page"
                                label-cols-sm="6"
                                label-cols-md="4"
                                label-cols-lg="3"
                                label-align-sm="right"
                                label-size="sm"
                                label-for="perPageSelect"
                                class="mb-0"
                                style="width:100%"
                                >
                                <b-form-select
                                    style="width:20%"
                                    v-model="perPage"
                                    id="perPageSelect"
                                    size="sm"
                                    :options="pageOptions"
                                ></b-form-select>
                                </b-form-group>
                            </b-col>

                            <b-col sm="7" md="6" class="my-1">
                                <b-pagination
                                v-model="currentPage"
                                :total-rows="totalRows"
                                :per-page="perPage"
                                align="fill"
                                size="sm"
                                class="my-0"
                                ></b-pagination>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>  
                </b-col>
            </b-row>
        </b-container>

        <!-- PEMBELIAN -->

    <b-modal
      id="modal-1"
      ref="modal"
      hide-footer
      hide-header
      size= "lg"
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

        <b-button v-b-modal.modal-2 variant="primary" style="margin-bottom:10px"
        >Tambah Data</b-button
        >

        <b-table
            show-empty
            bordered
            hover
            ref="table"
            :items="itemsPembelian"
            :fields="fieldsPembelian"
            responsive
            style="text-align:center"
            >
        </b-table>
        <b-button @click="validasiPembelian()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- MODAL PEMBELIAN -->

    <b-modal
      id="modal-2"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

        <b-form-group
            label="Nama Pembelian"
        >
        <b-form-select 
            v-model="namaPembelian" 
            :options="optionsPembelian"
            @change="itikiwir2(namaPembelian)"
            
        ></b-form-select>
        </b-form-group>

        <b-form-group
            label="Tanggal"
            label-for="tanggal"
            >
            <b-input-group>
                <b-input-group-append>
                    <b-form-datepicker
                    v-model="tanggalBanyumanik"
                    button-only
                    left
                    locale="en-US"
                    aria-controls="tanggal"
                    style="margin-bottom:10px"
                    ></b-form-datepicker>
                </b-input-group-append>
                <b-form-input
                    id="tanggal"
                    v-model="tanggalBanyumanik"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                ></b-form-input>
            </b-input-group>
        </b-form-group>

        <b-form-group 
            label="Nominal" 
        >
            <b-form-input
                v-model="hargaPembelian"
                required
                number
                placeholder="Silahkan Isi Nominal"

            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Jumlah" 
        >
            <b-form-input
                v-model="jumlahPembelian"
                required
                number
                placeholder="Silahkan Isi Jumlah"
                @change="totalPembelian(jumlahPembelian)"
            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Total Harga" 
        >
            <b-form-input
                v-model="totalHargaPembelian"
                required
                number
                disabled
                placeholder="Silahkan Isi Jumlah"

            ></b-form-input>
        </b-form-group>
        <b-form-group 
            label="Satuan" 
        >
            <b-form-input
                v-model="satuanPembelian"
                required
                placeholder="Silahkan Isi Satuan"

            ></b-form-input>
        </b-form-group>
        <b-button @click="addSubPembelian()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { ipBackend } from "@/config.js";
import moment from 'moment';
export default {
    name:'pembelianbanyumanik',
    data(){
        return{
            namaBarang:'',
            harga:'',
            satuan:'',
            dataPembelian:[],
            namaPembelian:null,
            optionsPembelian: [
                { value: null, text: 'Silahkan Pilih' },
            ],
            hargaPembelian:'',
            jumlahPembelian:'',
            satuanPembelian:'',
            totalHargaPembelian:'',
            itemsPembelian: [],
            fieldsPembelian: [
                {
                    key: 'tanggalBanyumanik',
                    label:'Tanggal',
                    sortable: true
                },
                {
                    key: 'namaPembelian',
                    label:'Nama Pembelian',
                    sortable: true
                },
                {
                    key: 'jumlahPembelian',
                    label:'Jumlah',
                    sortable: true
                },
                {
                    key: 'totalHargaPembelian',
                    label:'Total Harga',
                    sortable: true
                },
                {
                    key: 'satuan',
                    label:'Satuan',
                    sortable: true
                },
            ],
            tanggalsearch: null,
            tanggalBanyumanik: null,
            items:[],
            fields: [
                {
                key: 'nomor',
                label: "No",
                sortable: true,
                sortDirection: "desc",
                },
                {
                    key: 'tgl',
                    label:'Tanggal',
                    sortable: true
                },
                {
                    key: 'namaBarangBanyumanik',
                    label:'Nama Barang',
                    sortable: true
                },
                {
                    key: 'hargaBanyumanik',
                    label: 'Harga',
                    sortable: true
                },
                {
                    key: 'jumlahBanyumanik',
                    label: 'Jumlah',
                    sortable: true
                },
                {
                    key: 'satuanBanyumanik',
                    label: 'Satuan',
                    sortable: true
                },
            ],
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, 50, 100],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            bulan:null,
            options: [
                { value: null, text: 'Silahkan Pilih' },
                { value: 1, text: 'Januari' },
                { value: 2, text: 'Februari' },
                { value: 3, text: 'Maret' },
                { value: 4, text: 'April' },
                { value: 5, text: 'Mei' },
                { value: 6, text: 'Juni' },
                { value: 7, text: 'Juli' },
                { value: 8, text: 'Agustus' },
                { value: 9, text: 'September' },
                { value: 10, text: 'Oktober' },
                { value: 11, text: 'November' },
                { value: 12, text: 'Desember' },
            ],
            tahun:null,
            options2: [
                { value: null, text: 'Silahkan Pilih' },
                { value: 2021, text: '2021' },
                { value: 2022, text: '2022' },
                { value: 2023, text: '2023' },
                { value: 2024, text: '2024' },
                { value: 2025, text: '2025' },
                { value: 2026, text: '2026' },
                
            ],
        }
    },
    
    // computed: {
    //     onFiltered() {
    //             // Trigger pagination to update the number of buttons/pages due to filtering
    //             this.totalRows = this.items.length
    //             this.currentPage = 1
    //         },
    // },
    mounted(){
        this.getPembelian()
        this.getNow()
    },
    methods: {
        itikiwir2(x){
            let vm = this
            vm.dataPembelian.forEach((element, index) => {
                if(x == vm.dataPembelian[index].namaBarangPembelian){
                    vm.hargaPembelian = vm.dataPembelian[index].hargaBarangPembelian
                    vm.totalHargaPembelian = vm.hargaPembelian * vm.jumlahPembelian
                }
            })
        },
        totalPembelian(x){
            let vm = this
            vm.totalHargaPembelian = vm.hargaPembelian * x
        },
        kosongPembelian(){
            this.namaPembelian = null
            this.jumlahPembelian =''
            this.hargaPembelian = ''
            this.satuanPembelian = ''
        },
        getListHarian(){
            let vm = this
            let tgl = moment(vm.tanggalsearch)
            axios.post(ipBackend + "/pembelianBanyumanik/listByTanggal" , {
                tanggalBanyumanik: tgl
            } ,{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                vm.items = res.data
                console.log(vm.items, 'ini this item')
                res.data.forEach((element, index) => {
                    let x = vm.items[index]
                    x.nomor = index +1 
                    x.tgl = moment(vm.items[index].tanggalBanyumanik).format('DD-MM-YYYY')
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getListBulanan(){
            let vm = this
            let bln = vm.bulan
            let thn = vm.tahun
            axios.post(ipBackend + "/pembelianBanyumanik/listByBulanTahun" ,{
                bulan : bln,
                tahun : thn
            } ,{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                vm.items = res.data.data
                console.log(this.items, 'ini this item')
                res.data.data.forEach((element, index) => {
                    let x = this.items[index]
                    x.nomor = index +1 
                    x.tgl = moment(vm.items[index].tanggalBanyumanik).format('DD-MM-YYYY')
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getNow(){
            let vm = this
            vm.tgl = moment(new Date()).get('date')
            vm.bulan = moment(new Date()).get('month') + 1
            vm.tahun = moment(new Date()).get('year')
            vm.tanggalsearch = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            vm.tanggalBanyumanik = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            console.log(vm.tgl, 'ini tgl')
        },
        getPembelian(){
            let vm = this
            axios.get(ipBackend + "/masterBarangBeli/list",{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                vm.dataPembelian = res.data.respon
                console.log(this.items, 'ini data Pembelian')
                vm.dataPembelian.forEach((element, index) => {
                    let x = {}
                    x.value = vm.dataPembelian[index].namaBarangPembelian
                    x.text = vm.dataPembelian[index].namaBarangPembelian
                    vm.optionsPembelian.push(x)
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        addSubPembelian(){
            let vm = this
            let x = {}
            x.namaPembelian = vm.namaPembelian
            x.totalHargaPembelian = vm.totalHargaPembelian
            x.jumlahPembelian = vm.jumlahPembelian
            x.satuan = vm.satuanPembelian
            x.tanggalBanyumanik = vm.tanggalBanyumanik
            vm.itemsPembelian.push(x)
            x = {}
            this.$nextTick(() => {
                    this.$bvModal.hide('modal-2')
                    this.kosongPembelian()
                })
        },
        simpanPembelian(){
            let vm = this
            let bulk = []
            let x = {}
            vm.itemsPembelian.forEach((element, index) => {
                x.tanggalBanyumanik = moment(vm.itemsPembelian[index].tanggalBanyumanik)
                x.namaBarangBanyumanik = vm.itemsPembelian[index].namaPembelian
                x.hargaBanyumanik = vm.itemsPembelian[index].totalHargaPembelian
                x.jumlahBanyumanik = vm.itemsPembelian[index].jumlahPembelian
                x.satuanBanyumanik = vm.itemsPembelian[index].satuan
                bulk.push(x)
                x = {}
            })
            axios.post(ipBackend + '/pembelianBanyumanik/register', {
                bulk : bulk
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            }
            })
            .then(res => {
                console.log(res, 'ini resss nyaaaaaaa')
                vm.$swal("Sukses Input Berhasil");
                vm.$nextTick(() => {
                    vm.$bvModal.hide('modal-1')
                    vm.itemsPembelian = []
                })
                
            })
            .catch(err => {
                console.log(err)
            })
        },
        validasiPembelian(){
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
                    this.simpanPembelian()
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