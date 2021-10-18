<template>
    <div id="setoran">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>TAMBAH DATA REKAP SETORAN</strong>
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
                                    @click="getList()"    
                                >
                                    Lihat
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
                        :filter="filter"
                        :filter-included-fields="filterOn"
                        :sort-by.sync="sortBy"
                        :sort-desc.sync="sortDesc"
                        :sort-direction="sortDirection"
                        
                        responsive
                        style="text-align:center"
                        >
                        <template v-slot:cell(tambah)="row">
                            <b-button
                                size="sm"
                                variant="primary"
                                @click="addPemasukan(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="margin-bottom:5px"
                                >
                                Tambah Pemasukan
                            </b-button>
                            <b-button
                                size="sm"
                                variant="primary"
                                @click="addPengeluaran(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="margin-bottom:5px"
                                >
                                Tambah Pengeluaran
                            </b-button>
                            <b-button
                                size="sm"
                                variant="primary"
                                @click="addPembelian(row.item, row.index, $event.target)"
                                class="mr-1"
                                >
                                Tambah Pembelian
                            </b-button>
                        </template>
                        <template v-slot:cell(action)="row">
                            <b-button
                                size="sm"
                                variant="warning"
                                @click="detailPemasukan(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="align-item:center;justify-content:center;margin-bottom:5px "
                                >
                                Detail Pemasukan
                            </b-button>
                            <b-button
                                size="sm"
                                variant="warning"
                                @click="detailPengeluaran(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="align-item:center;justify-content:center;margin-bottom:5px"
                                >
                                Detail Pengeluaran
                            </b-button>
                            <b-button
                                size="sm"
                                variant="warning"
                                @click="detailPembelian(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="align-item:center;justify-content:center;"
                                >
                                Detail Pembelian
                            </b-button>
                            
                        </template>
                        </b-table>
                       
                    </b-card>   
                </div>  
                </b-col>
            </b-row>
        </b-container>
        <!-- MODAL -->
    <!-- insert -->
    <b-modal
      id="modal-1"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

         <b-form-group label="Pilih Shift :" >
          <b-form-radio v-model="shift" aria-describedby="input-shift-feedback" name="some-radios" value='1'>Shift 1</b-form-radio>
          <b-form-radio v-model="shift" aria-describedby="input-shift-feedback" name="some-radios" value='2'>Shift 2</b-form-radio>
          <b-form-radio v-model="shift" aria-describedby="input-shift-feedback" name="some-radios" value='3'>Shift 3</b-form-radio>
          <b-form-invalid-feedback id="input-shift-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group
            label="Tanggal"
            label-for="tanggal"
            >
            <b-input-group>
                <b-input-group-append>
                    <b-form-datepicker
                    v-model="$v.form.tanggal.$model"
                    button-only
                    left
                    locale="en-US"
                    aria-controls="tanggal"
                    style="margin-bottom:10px"
                    ></b-form-datepicker>
                </b-input-group-append>
                <b-form-input
                    id="tanggal"
                    v-model="$v.form.tanggal.$model"
                    type="text"
                    placeholder="YYYY-MM-DD"
                    autocomplete="off"
                    aria-describedby="input-tanggal-feedback"
                ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback id="input-tanggal-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group 
            label="Nama Kasir" 
        >
            <b-form-input
                v-model="$v.form.namakasir.$model"
                required
                placeholder="Silahkan Isi"
                :state="validateState('namakasir')"
                aria-describedby="input-namakasir-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-namakasir-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>
        <b-button @click="validasi()" variant="primary" class="m-t-15">Register</b-button>
    </b-modal>
    
    <!-- PEMASUKAN -->

    <b-modal
      :id="pemasukan.id"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

        <b-button v-b-modal.modal-4 variant="primary" style="margin-bottom:10px"
        >Tambah Data</b-button
        >

        <b-table
            show-empty
            bordered
            hover
            ref="table"
            :items="itemsPemasukan"
            :fields="fieldsPemasukan"
            responsive
            style="text-align:center"
            >
        </b-table>
        <b-button @click="validasiPemasukan()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- PENGELUARAN -->

    <b-modal
      :id="pengeluaran.id"
      ref="modal"
      hide-footer
      hide-header
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
            :items="itemsPengeluaran"
            :fields="fieldsPengeluaran"
            responsive
            style="text-align:center"
            >
        </b-table>
        <b-button @click="validasiPengeluaran()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- PEMBELIAN -->

    <b-modal
      :id="pembelian.id"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

        <b-button v-b-modal.modal-3 variant="primary" style="margin-bottom:10px"
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

    <!-- MODAL PEMASUKAN -->

    <b-modal
      id="modal-4"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>
        <b-form-group
            label="Nama Pemasukan"
        >
        <b-form-select 
            v-model="namaPemasukan" 
            :options="optionsPemasukan"
        ></b-form-select>
        </b-form-group>
        
        <b-form-group 
            label="Nominal" 
        >
            <b-form-input
                v-model="hargaPemasukan"
                required
                number
                placeholder="Silahkan Isi Nominal"

            ></b-form-input>
        </b-form-group>
        <b-button @click="addSubPemasukan()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- MODAL PENGELUARAN -->

    <b-modal
      id="modal-2"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

        <b-form-group
            label="Nama Pengeluaran"
        >
        <b-form-select 
            v-model="namaPengeluaran" 
            :options="optionsPengeluaran"
            @change="itikiwir(namaPengeluaran)"
            
        ></b-form-select>
        </b-form-group>

        <b-form-group 
            label="Nominal" 
        >
            <b-form-input
                v-model="hargaPengeluaran"
                required
                number
                placeholder="Silahkan Isi Nominal"

            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Jumlah" 
        >
            <b-form-input
                v-model="jumlahPengeluaran"
                required
                number
                placeholder="Silahkan Isi Jumlah"
                @change="totalPengeluaran(jumlahPengeluaran)"
            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Total Harga" 
        >
            <b-form-input
                v-model="totalHargaPengeluaran"
                required
                number
                disabled
                placeholder="Silahkan Isi Jumlah"

            ></b-form-input>
        </b-form-group>
        <b-button @click="addSubPengeluaran()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- MODAL PEMBELIAN -->

    <b-modal
      id="modal-3"
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
        <b-button @click="addSubPembelian()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

    <!-- DETAIL PEMASUKAN -->
    <b-modal
      :id="detailsPemasukan.id"
      ref="modal"
      title="Tambah Barang"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Detail Pemasukan</h2>
        <b-table
        hover
        ref="table"
        :items="itemsDetailPemasukan"
        :fields="fieldsDetailPemasukan"
        responsive
        style="text-align:center"
        >

        </b-table>
    </b-modal>

    <!-- DETAIL PENGELUARAN -->
    <b-modal
      :id="detailsPengeluaran.id"
      ref="modal"
      title="Tambah Barang"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Detail Pengeluaran</h2>
        <b-table
        hover
        ref="table"
        :items="itemsDetailPengeluaran"
        :fields="fieldsDetailPengeluaran"
        responsive
        style="text-align:center"
        >

        </b-table>
    </b-modal>

    <!-- DETAIL PEMBELIAN -->
    <b-modal
      :id="detailsPembelian.id"
      ref="modal"
      title="Tambah Barang"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Detail Pembelian</h2>
        <b-table
        hover
        ref="table"
        :items="itemsDetailPembelian"
        :fields="fieldsDetailPembelian"
        responsive
        style="text-align:center"
        >

        </b-table>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { ipBackend } from "@/config.js";
import moment from 'moment';
import { validationMixin } from "vuelidate"
import { required } from "vuelidate/lib/validators"
export default {
    name:'setoran',
    data(){
        return{
            form: {
                namakasir:null,
                tanggal:null
            },
            detailsPemasukan: {
                id: "detailPemasukan",
                title: "",
                content: "",
            },
            itemsDetailPemasukan: [],
            fieldsDetailPemasukan: [
                {
                    key: 'namaPemasukan',
                    label:'Nama Pemasukan',
                    sortable: true
                },
                {
                    key: 'hargaPemasukan',
                    label:'Total Pemasukan',
                    sortable: true
                },
            ],
            pemasukan: {
                id: "pemasukan",
                title: "",
                content: "",
            },
            itemsPemasukan: [],
            fieldsPemasukan: [
                
                {
                    key: 'namaPemasukan',
                    label:'Nama Pemasukan',
                    sortable: true
                },

                {
                    key: 'hargaPemasukan',
                    label:'Total Pemasukan',
                    sortable: true
                },
            ],
            namaPemasukan:null,
            optionsPemasukan: [
                { value: null, text: 'Silahkan Pilih' },
                { value: 'Pemasukan Soto', text: 'Pemasukan Soto' },
                { value: 'Pemasukan Snack', text: 'Pemasukan Snack' },
                { value: 'Pemasukan Beras', text: 'Pemasukan Beras' },
                { value: 'Pemasukan Butik', text: 'Pemasukan Butik' },
            ],
            hargaPemasukan:'',
            jumlahPemasukan:'',
            detailsPengeluaran: {
                id: "detailPengeluaran",
                title: "",
                content: "",
            },
            itemsDetailPengeluaran: [],
            fieldsDetailPengeluaran: [
                {
                    key: 'namaPengeluaran',
                    label:'Nama Pengeluaran',
                    sortable: true
                },
                {
                    key: 'jumlahPengeluaran',
                    label:'Jumlah',
                    sortable: true
                },
                {
                    key: 'hargaDetailPengeluaran',
                    label:'Harga',
                    sortable: true
                },
                {
                    key: 'hargaPengeluaran',
                    label:'Total Pengeluaran',
                    sortable: true
                },
            ],
            pengeluaran: {
                id: "pengeluaran",
                title: "",
                content: "",
            },
            dataPengeluaran:[],
            namaPengeluaran:null,
            optionsPengeluaran: [
                { value: null, text: 'Silahkan Pilih' },
            ],
            hargaPengeluaran:'',
            jumlahPengeluaran:'',
            totalHargaPengeluaran:'',
            itemsPengeluaran: [],
            fieldsPengeluaran: [
                
                {
                    key: 'namaPengeluaran',
                    label:'Nama Pengeluaran',
                    sortable: true
                },
                {
                    key: 'jumlahPengeluaran',
                    label:'Jumlah',
                    sortable: true
                },
                {
                    key: 'totalHargaPengeluaran',
                    label:'Total Nominal',
                    sortable: true
                },
            ],
            detailsPembelian: {
                id: "detailPembelian",
                title: "",
                content: "",
            },
            itemsDetailPembelian: [],
            fieldsDetailPembelian: [
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
                    key: 'hargaDetailPembelian',
                    label:'Total Pembelian',
                    sortable: true
                },
                {
                    key: 'hargaPembelian',
                    label:'Total Pembelian',
                    sortable: true
                },
            ],
            pembelian: {
                id: "pembelian",
                title: "",
                content: "",
            },
            dataPembelian:[],
            namaPembelian:null,
            optionsPembelian: [
                { value: null, text: 'Silahkan Pilih' },
            ],
            hargaPembelian:'',
            jumlahPembelian:'',
            totalHargaPembelian:'',
            itemsPembelian: [],
            fieldsPembelian: [
                
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
            ],
            tgl:null,
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
                    key: 'shift',
                    label:'Shift',
                    sortable: true
                },
                {
                    key: 'namaKasir',
                    label:'Nama Kasir',
                    sortable: true
                },
                {
                    key: 'totalPemasukan',
                    label: 'Pendapatan',
                    sortable: true
                },
                {
                    key: 'totalPembelian',
                    label: 'Pembelian',
                    sortable: true
                },
                {
                    key: 'totalPengeluaran',
                    label: 'Pengeluaran',
                    sortable: true
                },
                {
                    key: 'setor',
                    label: 'Setoran',
                    sortable: true
                },
                {
                    key: 'tambah',
                    label: 'Tambah',
                },
                {
                    key: 'action',
                    label: 'Action',
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
            setor:'',
            shift:'',
            idSetoran:'',
            tanggalsearch:null,
        }
    },
    mixins: [validationMixin],
    validations(){
        return {
            form: {
                namakasir: {
                    required,
                },
                tanggal:{
                    required,
                }
            }
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
        this.getNow()
        // this.getList()
        this.getPembelian()
        this.getPengeluaran()
        this.itungSetor()
    },
    methods: {
        detailPemasukan(item, index, button){
            let vm = this
            let idSetor = item.id
            axios.get(ipBackend + "/poolPemasukan/listBySetoranId/" + idSetor , {
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                vm.itemsDetailPemasukan = res.data.data
                console.log(vm.itemsDetailPemasukan, 'ini detail pemasukan')
                vm.detailsPemasukan.content = item;
                this.$root.$emit("bv::show::modal", vm.detailsPemasukan.id, button);
                
            })
            .catch((err) => {
                console.log(err);
            });
            // this.$root.$emit("bv::show::modal", this.detailsPemasukan.id, button);
            // console.log(this.idEdit);
        },
        detailPengeluaran(item, index, button){
            let vm = this
            let idSetor = item.id
            axios.get(ipBackend + "/poolPengeluaran/listBySetoranId/" + idSetor , {
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                vm.itemsDetailPengeluaran = res.data.data
                console.log(vm.itemsDetailPengeluaran, 'ini detail Pengeluaran')
                vm.itemsDetailPengeluaran.forEach((element, index) => {
                    let x = vm.itemsDetailPengeluaran[index]
                    x.hargaDetailPengeluaran = vm.itemsDetailPengeluaran[index].hargaPengeluaran / vm.itemsDetailPengeluaran[index].jumlahPengeluaran
                })
                vm.detailsPengeluaran.content = item;
                this.$root.$emit("bv::show::modal", vm.detailsPengeluaran.id, button);
            })
            .catch((err) => {
                console.log(err);
            });
            // this.$root.$emit("bv::show::modal", this.detailsPengeluaran.id, button);
            // console.log(this.idEdit);
        },
        detailPembelian(item, index, button){
            let vm = this
            let idSetor = item.id
            axios.get(ipBackend + "/poolPembelian/listBySetoranId/" + idSetor , {
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                vm.itemsDetailPembelian = res.data.data
                console.log(vm.itemsDetailPembelian, 'ini detail Pembelian')
                vm.itemsDetailPembelian.forEach((element, index) => {
                    let x = vm.itemsDetailPembelian[index]
                    x.hargaDetailPembelian = vm.itemsDetailPembelian[index].hargaPembelian / vm.itemsDetailPembelian[index].jumlahPembelian
                })
                vm.detailsPembelian.content = item;
                this.$root.$emit("bv::show::modal", vm.detailsPembelian.id, button);
            })
            .catch((err) => {
                console.log(err);
            });
            // this.$root.$emit("bv::show::modal", this.detailsPembelian.id, button);
            // console.log(this.idEdit);
        },
        itungSetor(){
            let vm = this
            vm.items.forEach((element, index) => {
                let x = vm.items[index]
                x.setor = vm.items[index].totalPemasukan - vm.items[index].totalPengeluaran - vm.items[index].totalPembelian
            })
            console.log(vm.items, 'iiiwiwiiwiw')
        },
        itikiwir(x){
            let vm = this
            vm.dataPengeluaran.forEach((element, index) => {
                if(x == vm.dataPengeluaran[index].namaPengeluaran){
                    vm.hargaPengeluaran = vm.dataPengeluaran[index].hargaPengeluaran
                    vm.totalHargaPengeluaran = vm.hargaPengeluaran * vm.jumlahPengeluaran
                }
            })
        },
        itikiwir2(x){
            let vm = this
            vm.dataPembelian.forEach((element, index) => {
                if(x == vm.dataPembelian[index].namaBarangPembelian){
                    vm.hargaPembelian = vm.dataPembelian[index].hargaBarangPembelian
                    vm.totalHargaPembelian = vm.hargaPembelian * vm.jumlahPembelian
                }
            })
        },
        totalPengeluaran(x){
            let vm = this
            vm.totalHargaPengeluaran = vm.hargaPengeluaran * x
        },
        totalPembelian(x){
            let vm = this
            vm.totalHargaPembelian = vm.hargaPembelian * x
        },
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                namakasir: null,                
            };
            this.$nextTick(() => {
                this.$v.$reset();
                this.getNow()
            });
        },
        kosongPemasukan(){
            this.namaPemasukan = null
            this.jumlahPemasukan =''
            this.hargaPemasukan = ''
        },
        kosongPengeluaran(){
            this.namaPengeluaran = null
            this.jumlahPengeluaran =''
            this.hargaPengeluaran = ''
        },
        kosongPembelian(){
            this.namaPembelian = null
            this.jumlahPembelian =''
            this.hargaPembelian = ''
        },
        getNow(){
            let vm = this
            // vm.tgl = moment(new Date()).get('date')
            // vm.bulan = moment(new Date()).get('month') + 1
            // vm.tahun = moment(new Date()).get('year')
            vm.form.tanggal = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            vm.tanggalsearch = moment(new Date()).startOf('day').format('YYYY-MM-DD')
            console.log(vm.tgl, 'ini tgl')
        },
        getList(){
            let vm = this
            let tgl = moment(vm.tanggalsearch).get('date')
            let bln = moment(vm.tanggalsearch).get('month') + 1
            let thn = moment(vm.tanggalsearch).get('year')
            axios.get(ipBackend + "/setoran/listHarian/" + tgl + '/' + bln + '/' + thn ,{
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
                    x.tgl = moment(vm.items[index].tanggal).format('DD-MM-YYYY')
                    x.setor = vm.items[index].totalPemasukan - vm.items[index].totalPengeluaran - vm.items[index].totalPembelian        
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getPengeluaran(){
            let vm = this
            axios.get(ipBackend + "/masterPengeluaran/list",{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                vm.dataPengeluaran = res.data.respon
                console.log(this.items, 'ini this item')
                vm.dataPengeluaran.forEach((element, index) => {
                    let x = {}
                    x.value = vm.dataPengeluaran[index].namaPengeluaran
                    x.text = vm.dataPengeluaran[index].namaPengeluaran
                    vm.optionsPengeluaran.push(x)
                });
            })
            .catch((err) => {
                console.log(err);
            });
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
        simpan(){
            let vm = this
            let tgls = moment(vm.form.tanggal)
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return;
            }
            else{
                    axios.post(ipBackend + '/setoran/register', {
                        tanggal : tgls,
                        shift : vm.shift,
                        namaKasir: vm.form.namakasir,
                    },
                    {
                        headers: {
                        accesstoken: localStorage.getItem("token"),
                    }
                    })
                    .then(res => {
                        console.log(res, 'ini resss nyaaaaaaa')
                        this.$swal("Sukses Input Berhasil");
                        this.resetForm()
                        vm.$nextTick(() => {
                            vm.$bvModal.hide('modal-1')
                        })
                        this.getList()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            
        },
        addPemasukan(item, index, button){
            this.pemasukan.content = item;
            this.idSetoran = item.id;
            this.$root.$emit("bv::show::modal", this.pemasukan.id, button);
            console.log(this.idSetoran);
        },
        addPengeluaran(item, index, button){
            this.pengeluaran.content = item;
            this.idSetoran = item.id;
            this.$root.$emit("bv::show::modal", this.pengeluaran.id, button);
            console.log(this.idSetoran);
        },
        addPembelian(item, index, button){
            this.pembelian.content = item;
            this.idSetoran = item.id;
            this.$root.$emit("bv::show::modal", this.pembelian.id, button);
            console.log(this.idSetoran);
        },
        addSubPemasukan(){
            let vm = this
            let x = {}
            x.setoranId = vm.idSetoran
            x.namaPemasukan = vm.namaPemasukan
            x.hargaPemasukan = vm.hargaPemasukan
            x.jumlahPemasukan = vm.jumlahPemasukan
            vm.itemsPemasukan.push(x)
            x = {}
            this.$nextTick(() => {
                    this.$bvModal.hide('modal-4')
                    this.kosongPemasukan()
                })
        },
        addSubPengeluaran(){
            let vm = this
            let x = {}
            x.setoranId = vm.idSetoran
            x.namaPengeluaran = vm.namaPengeluaran
            x.totalHargaPengeluaran = vm.totalHargaPengeluaran
            x.jumlahPengeluaran = vm.jumlahPengeluaran
            vm.itemsPengeluaran.push(x)
            x = {}
            this.$nextTick(() => {
                    this.$bvModal.hide('modal-2')
                    this.kosongPengeluaran()
                })
        },
        addSubPembelian(){
            let vm = this
            let x = {}
            x.setoranId = vm.idSetoran
            x.namaPembelian = vm.namaPembelian
            x.totalHargaPembelian = vm.totalHargaPembelian
            x.jumlahPembelian = vm.jumlahPembelian
            vm.itemsPembelian.push(x)
            x = {}
            this.$nextTick(() => {
                    this.$bvModal.hide('modal-3')
                    this.kosongPembelian()
                })
        },
        simpanPemasukan(){
            let vm = this
            let bulk = []
            let x = {}
            vm.itemsPemasukan.forEach((element, index) => {
                x.setoranId = vm.itemsPemasukan[index].setoranId
                x.namaPemasukan = vm.itemsPemasukan[index].namaPemasukan
                x.hargaPemasukan = vm.itemsPemasukan[index].hargaPemasukan
                x.jumlahPemasukan = 0
                bulk.push(x)
                x = {}
            })
            axios.post(ipBackend + '/poolPemasukan/register', {
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
                vm.itemsPemasukan = []
                this.$root.$emit("bv::hide::modal", "pemasukan");
                this.getList()
                this.itungSetor()
            })
            .catch(err => {
                console.log(err)
            })
        },
        simpanPengeluaran(){
            let vm = this
            let bulk = []
            let x = {}
            vm.itemsPengeluaran.forEach((element, index) => {
                x.setoranId = vm.itemsPengeluaran[index].setoranId
                x.namaPengeluaran = vm.itemsPengeluaran[index].namaPengeluaran
                x.hargaPengeluaran = vm.itemsPengeluaran[index].totalHargaPengeluaran
                x.jumlahPengeluaran = vm.itemsPengeluaran[index].jumlahPengeluaran
                bulk.push(x)
                x = {}
            })
            axios.post(ipBackend + '/poolPengeluaran/register', {
                bulk : bulk
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            }
            })
            .then(res => {
                console.log(res, 'ini resss penjualannnnnn')
                vm.$swal("Sukses Input Berhasil");
                vm.itemsPengeluaran = []
                this.$root.$emit("bv::hide::modal", "pengeluaran");
                this.getList()
                this.itungSetor()
            })
            .catch(err => {
                console.log(err)
            })
        },
        simpanPembelian(){
            let vm = this
            let bulk = []
            let x = {}
            vm.itemsPembelian.forEach((element, index) => {
                x.setoranId = vm.itemsPembelian[index].setoranId
                x.namaPembelian = vm.itemsPembelian[index].namaPembelian
                x.hargaPembelian = vm.itemsPembelian[index].totalHargaPembelian
                x.jumlahPembelian = vm.itemsPembelian[index].jumlahPembelian
                bulk.push(x)
                x = {}
            })
            axios.post(ipBackend + '/poolPembelian/register', {
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
                vm.itemsPembelian = []
                this.$root.$emit("bv::hide::modal", "pembelian");
                this.getList()
                this.itungSetor()
            })
            .catch(err => {
                console.log(err)
            })
        },
        validasi(){
            this.$confirm(
                {
                message: `Apakah yakin pesanan sudah benar?`,
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
        validasiPemasukan(){
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
                    this.simpanPemasukan()
                    }
                }
                }
            )
        },
        validasiPengeluaran(){
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
                    this.simpanPengeluaran()
                    }
                }
                }
            )
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