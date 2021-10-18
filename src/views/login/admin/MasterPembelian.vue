<template>
    <div id="pembelian">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong> DATA MASTER BARANG PEMBELIAN</strong>
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
                                variant="warning"
                                @click="editModal(row.item, row.index, $event.target)"
                                class="mr-1"
                                >
                                Edit
                            </b-button>
                            <b-button
                                size="sm"
                                variant="danger"
                                @click="handleClick(row.item.id)"
                                class="mr-1"
                                >
                                Hapus
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
      title="Daftar Beban"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Data</h2>
        <b-form-group 
            label="Nama Barang" 
        >
            <b-form-input
                v-model="$v.form.namaBarangPembelian.$model"
                required
                placeholder="Silahkan Isi Nama Barang"
                :state="validateState('namaBarangPembelian')"
                aria-describedby="input-barang-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-barang-feedback">Silahkan isi dahulu.</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group 
            label="Harga" 
        >
            <b-form-input
                v-model="$v.form.hargaBarangPembelian.$model"
                required
                number
                placeholder="Silahkan Isi Harga"
                :state="validateState('hargaBarangPembelian')"
                aria-describedby="input-harga-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="input-harga-feedback">Silahkan isi dahulu dan harus angka.</b-form-invalid-feedback>
        </b-form-group>
        <b-button @click="validasi()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
    <!-- edit -->
    <b-modal
      :id="editModals.id"
      ref="modal"
      title="Edit Data"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Edit Data</h2>
        <b-form-group 
            label="Nama Barang" 
        >
            <b-form-input
                v-model="editModals.content.namaBarangPembelian"
            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Harga" 
        >
            <b-form-input
                v-model="editModals.content.hargaBarangPembelian"
                number
            ></b-form-input>
        </b-form-group>
        <b-button @click="validasiEdit()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import { ipBackend } from "@/config.js";
import { validationMixin } from "vuelidate"
import { required, numeric } from "vuelidate/lib/validators"
// import moment from 'moment';   
export default {
    name:'masterpembelian',
    data(){
        return{
            form: {
                namaBarangPembelian:null,
                hargaBarangPembelian:null,
            },
            namaBarangPembelian:'',
            hargaBarangPembelian:'',
            idEdit:'',
            editModals: {
                id: "editModal",
                title: "",
                content: "",
            },
            items:[],
            fields: [
                {
                    key: "nomor",
                    label: "No",
                    sortable: true,
                    sortDirection: "desc",
                },
                {
                    key: 'namaBarangPembelian',
                    label:'Nama Barang',
                    sortable: true
                },
                {
                    key: 'hargaBarangPembelian',
                    label: 'Harga',
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
                namaBarangPembelian: {
                    required
                },
                
                hargaBarangPembelian:{
                    required,
                    numeric
                },
            }
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        validateState(name) {
            const { $dirty, $error } = this.$v.form[name];
            return $dirty ? !$error : null;
        },
        resetForm() {
            this.form = {
                namaBarangPembelian: null,
                hargaBarangPembelian: null,
            };

            this.$nextTick(() => {
                this.$v.$reset();
            });
        },
        getList(){
            let vm = this
            axios.get(ipBackend + "/masterBarangBeli/list",{
                headers: {
                accesstoken: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                vm.items = res.data.respon
                console.log(this.items, 'ini this item')
                res.data.respon.forEach((element, index) => {
                    let x = this.items[index]
                    x.nomor = index +1 
                            
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        simpan(){
            let vm = this
            axios.post(ipBackend + '/masterBarangBeli/register', {
                namaBarangPembelian : vm.form.namaBarangPembelian,
                hargaBarangPembelian : vm.form.hargaBarangPembelian
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
                    this.getList()
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editModal(item, index, button) {
            this.editModals.content = item;
            this.idEdit = item.id;
            this.namaBarangPembelian = item.namaBarangPembelian;
            this.hargaBarangPembelian = item.hargaBarangPembelian;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
        },
        editItem(){
            let vm = this
            axios.post(ipBackend + '/masterBarangBeli/update', {
                id : vm.editModals.content.id,
                namaBarangPembelian : vm.editModals.content.namaBarangPembelian,
                hargaBarangPembelian : vm.editModals.content.hargaBarangPembelian,
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            }
            })
            .then(res => {
                console.log(res, 'ini resss nyaaaaaaa')
                this.$swal("Berhasil");
                let index = this.items.findIndex((o) => o.id === this.idEdit);
                vm.items[index] = vm.editModals.content;
                this.$root.$emit("bv::hide::modal", "editModal");
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteItem(idData){
            let vm = this
            axios.post(ipBackend + '/masterBarangBeli/delete', {
                id : idData
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            }
            })
            .then(res => {
                console.log(res)
                vm.$swal("berhasil");
                let index = this.items.findIndex((o) => o.id === idData);
                vm.items.splice(index, 1);
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
        validasiEdit(){
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
                    this.editItem()
                    }
                }
                }
            )
        },
        handleClick(idData){
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
                    this.deleteItem(idData)
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