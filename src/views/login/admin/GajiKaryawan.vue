<template>
    <div id="gaji">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA GAJI BULANAN</strong>
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
                        
                        <template #cell(cashBon)="item">
                            <b-form-input
                                v-model="item.item.cashBon"
                                name="checkbox-1"
                                @change="itikiwir(item)"
                            >
                            </b-form-input>               
                        </template>
                        </b-table>
                       
                    </b-card> 
                    <b-row class="m-t-30" style="margin-top:20px;">
                    <b-col md="12">
                        <b-button v-if="this.bulan && this.tahun != null" @click="validasi()" variant="primary"
                        >Simpan Data</b-button
                        >
                    </b-col>
                    </b-row>  
                </div>  
                </b-col>
            </b-row>
        </b-container>
        <!-- MODAL -->
        <!-- Detail -->
        <b-modal
        :id="editModals.id"
        ref="modal"
        title="Detail Absensi"
        hide-footer
        hide-header
        >
        <h2 class="text-center" style="margin-bottom:10px;">Edit Gaji</h2>
            <table>
                <tr>
                    <td style="width:150px">Nama Karyawan</td>
                    <td>: {{namaKaryawan}}</td>
                </tr>
            </table>
            
            <b-form-group 
                label="Gaji Harian" 
            >
            <b-form-input
                v-model="editModals.content.gajiKaryawan"
                placeholder="Silahkan Isi Alamat"
            ></b-form-input>
            </b-form-group>
            <b-button @click="editData()" variant="primary" class="m-t-15">Simpan</b-button>
        </b-modal>
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
                    key: 'role',
                    label:'Jabatan',
                    sortable: true
                },
                {
                    key: 'handphone',
                    label: 'No. Handphone',
                    sortable: true
                },
                {
                    key: 'jumlahMasuk',
                    label: 'Jumlah Masuk',
                    sortable: true
                },
                {
                    key: 'totalGaji',
                    label: 'Total Gaji',
                    sortable: true
                },
                {
                    key: 'cashBon',
                    label: 'Kasbon',
                    sortable: true
                },
                
            ],
            editModals: {
                id: "editModal",
                title: "",
                content: "",
            },
            totalRows: 1,
            currentPage: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, 50, 100],
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            filter: null,
            filterOn: [],
            namaKaryawan:'Adhit',
            totalGaji: "",
            gajiKaryawan: '',
            totalMasuk: '',
        }
    },
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
        itikiwir(x){
            console.log(x)
        },
        refresh() {
            let vm = this
                // Trigger pagination to update the number of buttons/pages due to filtering
                this.items.forEach((element, index) => {
                    let x = this.items[index]
                    x.totalGaji = vm.items[index].gajiKaryawan * vm.items[index].jumlahMasuk        
                });
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
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        editModal(item, index, button) {
            this.editModals.content = item;
            this.idEdit = item.id;
            this.gajiKaryawan = item.gajiKaryawan
            this.editModals.content.totalGaji =  this.editModals.content.jumlahMasuk *  this.editModals.content.gajiKaryawan
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
        },
        editData() {
            let vm = this;
            axios.post(ipBackend + "/karyawan/update/" + this.idEdit, {
                  gajiKaryawan: this.editModals.content.gajiKaryawan,
                },
                {
                  headers: {
                    accesstoken: localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                console.log(res.data, 'ini responyaaaaaaaaaaaaaaaa');
                this.$swal("Berhasil Mengedit Data");
                let idNew = this.items.findIndex((o) => o.id === this.idEdit);
                vm.items[idNew] = vm.editModals.content;
                vm.items[idNew].totalGaji = vm.editModals.content.gajiKaryawan * vm.editModals.content.jumlahMasuk;
                this.refresh()
                this.$root.$emit("bv::hide::modal", "editModal");
              })
              .catch((err) => {
                console.log(err);
              });
        },
        simpan(){
            let vm = this
            let isi = []
            let penampung = {}
            vm.items.forEach((element, index) => {
                penampung.karyawanId = vm.items[index].id
                penampung.gajiHarian = vm.items[index].gajiKaryawan
                penampung.jumlahMasuk = vm.items[index].jumlahMasuk
                penampung.cashBon = vm.items[index].cashBon
                penampung.gajiBulanan = vm.items[index].gajiKaryawan * vm.items[index].jumlahMasuk - vm.items[index].cashBon
                penampung.bulan = vm.bulan
                penampung.tahun = vm.tahun
                isi.push(penampung)
                penampung = {}
                // console.log(penampung2, 'ini penampung2')
                });
                // console.log(isi, 'ini isinya')
            axios.post(ipBackend + '/rekapGaji/register', {
                bulk : isi
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            }
            })
            .then(res => {
                console.log(res, 'ini resss nyaaaaaaa')
                if(res.data.message == 'rekap gaji untuk bulan tersebut sudah ada'){
                    this.$swal("Maaf gaji bulan ini sudah ada");
                }else {
                    this.$swal("Sukses Input Berhasil");
                }
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
    }
}
</script>

<style scoped>

</style>