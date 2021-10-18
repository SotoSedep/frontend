<template>
    <div id="gajibulan">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA REKAP GAJI BULANAN</strong>
                            </h3>
                        </b-col>
                    </b-row>
                <div style="margin-top:30px">
                        
                        <b-row style="margin-top:20px">
                            <b-col md="4">
                            <b-form-group
                            label="Pilih Bulan"
                            label-for="bulansearch"
                            label-cols-md="3"
                            label-align-md="right"
                            label-size="md"
                            class="mb-0"
                            >
                             <b-form-select v-model="bulan" :options="options"></b-form-select>   
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
                                @click="getList()"
                                style="margin-top:15px"
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
                        </b-table>
                       
                    </b-card>   
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
    name:'gajibulan',
    data(){
        return{
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
                    key: 'nama',
                    label:'Nama Karyawan',
                    sortable: true
                },
                {
                    key: 'jumlahMasuk',
                    label: 'Jumlah Masuk',
                    sortable: true
                },
                {
                    key: 'totalGaji',
                    label:'Gaji Harian',
                    sortable: true
                },
                {
                    key: 'totalKasbon',
                    label:'Kasbon',
                    sortable: true
                },
                {
                    key: 'gajiBulanan',
                    label: 'Total Gaji',
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
            namaKaryawan:'',
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
    },
    methods: {
        getNow(){
            let vm = this
            vm.bulan = moment(new Date()).get('month') + 1
            vm.tahun = moment(new Date()).get('year')
            console.log(vm.tgl, 'ini tgl')
        },
        getList(){
            let vm = this
            let bln = vm.bulan
            let thn = vm.tahun
            axios.post(ipBackend + "/absensi/rekapKaryawanBulanan" ,{
                bulan : bln,
                tahun : thn
            },{
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
                    let h = parseInt(x.totalAbsen)
                    let i = parseInt(x.totalStghHari)
                    x.nomor = index +1 
                    x.jumlahMasuk = h + i
                    x.gajiBulanan = x.totalGaji - x.totalKasbon        
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        detail(item, index, button){
            let vm = this
            let bln = vm.bulan
            let thn = vm.tahun
            let karId = item.id
            this.editModals.content = item;
            this.idEdit = item.id;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            axios.get(ipBackend + "/absensi/absensiByKaryawanId/" + karId + '/' + bln + '/' + thn ,{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)

                // vm.items = res.data.data
                // console.log(this.items, 'ini this item')
                // res.data.data.forEach((element, index) => {
                //     let x = this.items[index]
                //     x.nomor = index +1 
                            
                // });
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>

<style scoped>

</style>