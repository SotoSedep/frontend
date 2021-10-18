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
                        <template v-slot:cell(action)="row">
                            <b-button
                                size="sm"
                                variant="warning"
                                @click="detailPemasukan(row.item, row.index, $event.target)"
                                class="mr-1"
                                style="align-item:center;justify-content:center;margin-bottom:5px "
                                >
                                Detail Pendapatan
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
    <!-- DETAIL PEMASUKAN -->
    <b-modal
      :id="detailsPemasukan.id"
      ref="modal"
      title="Tambah Barang"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Detail Pendapatan</h2>
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
                    key: 'action',
                    label: 'Action',
                },
            ],
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
    mounted(){
        this.getNow()
    },
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
                this.getNow()
            });
        },
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
        getNow(){
            let vm = this
            vm.bulan = moment(new Date()).get('month') + 1
            vm.tahun = moment(new Date()).get('year')

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
                    x.setor = vm.items[index].totalPemasukan - vm.items[index].totalPengeluaran - vm.items[index].totalPembelian       
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