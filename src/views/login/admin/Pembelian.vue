<template>
    <div id="pembelian">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>TAMBAH DATA PEMBELIAN</strong>
                            </h3>
                        </b-col>
                    </b-row>
                    <b-row class="m-t-30" style="margin-top:20px; position: absolute;">
                    <b-col md="12">
                        <b-button v-b-modal.modal-1 variant="primary"
                        >Tambah Data</b-button
                        >
                    </b-col>
                    </b-row>
                <div style="margin-top:80px">
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
                        <template v-slot:cell(actions)="row">
                            <b-button
                                size="sm"
                                variant="danger"
                                @click="deleteItem(row.item.id)"
                                class="mr-1"
                                >
                                Hapus
                            </b-button>
                        </template>
                        </b-table>
                    </b-card>
                    <b-button @click="validasi()" variant="primary" class="m-t-15" style="width:100px;left:0;margin-bottom:10px" >Simpan</b-button>   
                </div>  
                </b-col>
            </b-row>
        </b-container>

    <!-- MODAL -->
    <!-- insert -->
    <b-modal
      id="modal-1"
      ref="modal"
      title="Daftar Beban"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>
        <b-form-group 
            label="Nama Barang" 
        >
            <b-form-input
                v-model="$v.form.namaBarang.$model"
                required
                placeholder="Silahkan Isi Nama Barang"
                :state="validateState('namaBarang')"
                aria-describedby="input-barang-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-barang-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group 
            label="Harga" 
        >
            <b-form-input
                v-model="$v.form.harga.$model"
                required
                number
                placeholder="Silahkan Isi Harga"
                :state="validateState('harga')"
                aria-describedby="input-harga-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-harga-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group 
            label="Jumlah" 
        >
            <b-form-input
                v-model="$v.form.jumlah.$model"
                required
                number
                placeholder="Silahkan Isi Jumlah"
                :state="validateState('jumlah')"
                aria-describedby="input-jumlah-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-jumlah-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>
        <b-form-group 
            label="Satuan" 
        >
            <b-form-input
                v-model="$v.form.satuan.$model"
                required
                placeholder="Silahkan Isi Satuan"
                :state="validateState('satuan')"
                aria-describedby="input-satuan-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-satuan-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
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
                ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback id="input-satuan-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>
        <b-button @click="addSub()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { ipBackend } from "@/config.js";
import { validationMixin } from "vuelidate"
import { required, numeric } from "vuelidate/lib/validators"
import moment from 'moment';   
export default {
    name:'pembelian',
    data(){
        return{
            form: {
                namaBarang:null,
                jumlah:null,
                harga:null,
                satuan:null,
                tanggal:null
            },
            items:[],
            fields: [
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
                {
                    key: 'tanggal',
                    label: 'Tanggal',
                    sortable: true
                },
                { key: "actions", label: "Actions" },
            ],

        }
    },
    mixins: [validationMixin],
    validations(){
        return {
            form: {
                namaBarang: {
                    required
                },
                jumlah:{
                    required,
                    numeric
                },
                harga:{
                    required,
                    numeric
                },
                satuan:{
                    required,
                },
                tanggal:{
                    required,
                }
            }
        }
    },
   
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                namaBarang: null,
                jumlah: null,
                harga: null,
                satuan: null,
                tanggal : null
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        addSub(){           
            let vm = this
            this.$v.form.$touch();
            if(this.$v.form.$anyError) {
                return;
            }
            else{
                    let x ={}
                        x.namaBarang = vm.form.namaBarang
                        x.jumlah = vm.form.jumlah
                        x.harga = vm.form.harga 
                        x.satuan = vm.form.satuan
                        x.tanggal = vm.form.tanggal         
                        vm.items.push(x)
                }
            this.$nextTick(() => {
                    this.$bvModal.hide('modal-1')
                    vm.resetForm()
                })
                console.log(this.items, 'ini itemsnya bosss')
            },
            simpan(){
            let vm = this
            let isi = []
            let penampung = {}
            vm.items.forEach((element, index) => {
                penampung.namaBarang = vm.items[index].namaBarang
                penampung.jumlah = vm.items[index].jumlah
                penampung.harga = vm.items[index].harga
                penampung.satuan = vm.items[index].satuan
                penampung.tanggal = moment(vm.items[index].tanggal)
                isi.push(penampung)
                penampung = {}
                // console.log(penampung2, 'ini penampung2')
                });
                // console.log(isi, 'ini isinya')
            axios.post(ipBackend + '/pembelian/register', {
                bulk : isi
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
                this.items = []
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