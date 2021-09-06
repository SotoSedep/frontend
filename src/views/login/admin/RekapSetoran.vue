<template>
    <div id="setoran">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA REKAP SETORAN</strong>
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
        <!-- MODAL -->
    <!-- insert -->
    <b-modal
      id="modal-1"
      ref="modal"
      title="Daftar Karyawan"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>

         <b-form-group label="Pilih Shift :" >
          <b-form-radio v-model="shift" aria-describedby="input-shift-feedback" name="some-radios" value='1'>Shift 1</b-form-radio>
          <b-form-radio v-model="shift" aria-describedby="input-shift-feedback" name="some-radios" value='2'>Shift 2</b-form-radio>
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
            label="Pendapatan" 
        >
            <b-form-input
                v-model="$v.form.pendapatan.$model"
                required
                placeholder="Silahkan Isi Pendapatan"
                :state="validateState('pendapatan')"
                aria-describedby="input-pendapatan-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-pendapatan-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group 
            label="Pengeluaran" 
        >
            <b-form-input
                v-model="$v.form.pengeluaran.$model"
                required
                placeholder="Silahkan Isi Pengeluaran"
                :state="validateState('pengeluaran')"
                aria-describedby="input-pengeluaran-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-pengeluaran-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group 
            label="Beras" 
        >
            <b-form-input
                v-model="$v.form.beras.$model"
                required
                placeholder="Silahkan Isi Beras"
                :state="validateState('beras')"
                aria-describedby="input-beras-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-beras-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>

        <b-button @click="validasi()" variant="primary" class="m-t-15">Register</b-button>
    </b-modal>
    </div>
</template>

<script>

import axios from 'axios';
import { ipBackend } from "@/config.js";
import moment from 'moment';
import { validationMixin } from "vuelidate"
import { required, numeric } from "vuelidate/lib/validators"
export default {
    name:'setoran',
    data(){
        return{
            form: {
                pengeluaran:null,
                pendapatan:null,
                beras:null,
                shift:null,
                tanggal:null
            },
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
                    key: 'pendapatan',
                    label: 'Pendapatan',
                    sortable: true
                },
                {
                    key: 'pengeluaran',
                    label: 'Pengeluaran',
                    sortable: true
                },
                {
                    key: 'setor',
                    label: 'Setoran',
                    sortable: true
                },
                {
                    key: 'beras',
                    label: 'Beras',
                    sortable: true
                },
            ],
            itemsDetail:[],
            details: {
                id: "detail",
                title: "",
                content: "",
            },
            fieldsDetail: [
                
                {
                    key: 'tgl',
                    label:'Tanggal',
                    sortable: true
                },
                {
                    key: 'absen',
                    label:'Kehadiran',
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
            tanggal:'',
            shift:'',
            pendapatan:'',
            pengeluaran:'',
            beras:'',
            setor:'',
        }
    },
    mixins: [validationMixin],
    validations(){
        return {
            form: {
                pendapatan: {
                    required,
                    numeric
                },
                pengeluaran:{
                    required,
                    numeric
                },
                beras:{
                    required,
                    numeric
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
    
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                pendapatan: null,
                pengeluaran: null,
                beras: null,
                tanggal : null
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        getList(){
            let vm = this
            let bln = vm.bulan
            let thn = vm.tahun
            axios.get(ipBackend + "/setoran/listBulanan/" + bln + '/' + thn ,{
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
                });
                this.items.sort(function(a, b){return a.tgl - b.tgl})
            })
            .catch((err) => {
                console.log(err);
            });
        },
        simpan(){
            let vm = this
            vm.setor = vm.form.pendapatan - vm.form.pengeluaran - vm.form.beras
            let tgl = moment(vm.form.tanggal)
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return;
            }
            else{
                    axios.post(ipBackend + '/setoran/register', {
                        tanggal : tgl,
                        pendapatan : vm.form.pendapatan,
                        pengeluaran : vm.form.pengeluaran,
                        shift : vm.shift,
                        beras : vm.form.beras,
                        setor : vm.setor
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
                        this.items = []
                    })
                    .catch(err => {
                        console.log(err)
                    })
                }
            
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
    }
}
</script>

<style scoped>

</style>