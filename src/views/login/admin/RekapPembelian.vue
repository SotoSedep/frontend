<template>
    <div id="rekappembelian">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA REKAP PEMBELIAN</strong>
                            </h3>
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
    </div>
</template>

<script>

import axios from 'axios';
import { ipBackend } from "@/config.js";
import moment from 'moment';
export default {
    name:'rekappembelian',
    data(){
        return{
            namaBarang:'',
            harga:'',
            satuan:'',
            tanggalsearch:'',
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
                    key: 'namaBarang',
                    label:'Nama Barang',
                    sortable: true
                },
                {
                    key: 'harga',
                    label: 'Harga',
                    sortable: true
                },
                {
                    key: 'jumlah',
                    label: 'Jumlah',
                    sortable: true
                },
                {
                    key: 'satuan',
                    label: 'Satuan',
                    sortable: true
                },
                { key: "actions", label: "Actions" },
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
        }
    },
    
    // computed: {
    //     onFiltered() {
    //             // Trigger pagination to update the number of buttons/pages due to filtering
    //             this.totalRows = this.items.length
    //             this.currentPage = 1
    //         },
    // },
    
    methods: {
        getList(){
            let vm = this
            let tgl = moment(vm.tanggalsearch)
            axios.post(ipBackend + "/pembelian/listByTanggal", {
                tanggal: tgl
            },{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                this.items = res.data
                console.log(this.items, 'ini this item')
                res.data.forEach((element, index) => {
                    let x = this.items[index]
                    x.nomor = index +1 
                    x.tgl = moment(this.items[index].tanggal).format('DD-MM-YYYY')           
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        
    }
}
</script>

<style scoped>

</style>