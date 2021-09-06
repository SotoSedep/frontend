<template>
    <div id="beban">
        <b-container>
            <b-row>
                <b-col md="12">
                    <b-row>
                        <b-col md="12" style="margin-top : 30px; margin-bottom: 30px">
                            <h3 class="text-center m-t-0 m-b-0">
                            <strong>DATA BEBAN</strong>
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
                        <b-row style="margin-top:20px">
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
                        @filtered="onFiltered"
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
                            @click="handleClick(row.item, row.index, $event.target)"
                            class="mr-1"
                            >
                            Hapus
                            </b-button>
                        </template>
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
            label="Kode Akun" 
        >
            <b-form-row>
                <b-col md="2"><b-form-input v-model="kode" disabled /></b-col>
                <b-col><b-form-input v-model="kodeAkun" placeholder="Silahkan isi Kode Akun"/></b-col>
            </b-form-row>
        </b-form-group>

        <b-form-group 
            label="Nama Akun" 
        >
            <b-form-input
                v-model="namaAkun"
                required
                placeholder="Silahkan Isi Nama Akun"
            ></b-form-input>
        </b-form-group>
        <b-form-group 
            label="Balance" 
        >
            <b-form-input
                v-model="balance"
                required
                placeholder="Silahkan Isi Balance"
            ></b-form-input>
        </b-form-group>
        <b-button @click="signup()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
        <!-- edit -->
    <b-modal
      :id="editModals.id"
      ref="modal"
      hide-footer
      hide-header
    >
    <h2 class="text-center" style="margin-bottom:10px;">Edit Data</h2>
        <b-form-group 
            label="Kode Akun" 
        >
            <b-form-input
                v-model="editModals.content.kodeAkun"
                required
                placeholder="Silahkan Isi Kode Akun"
            ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Nama Akun" 
        >
            <b-form-input
                v-model="editModals.content.namaAkun"
                required
                placeholder="Silahkan Isi Nama Akun"
            ></b-form-input>
        </b-form-group>
        <b-form-group 
            label="Balance" 
        >
            <b-form-input
                v-model="editModals.content.balance"
                required
                placeholder="Silahkan Isi Balance"
            ></b-form-input>
        </b-form-group>
        <b-button @click="editData()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
    </div>
</template>

<script>
const numeral = require("numeral");
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:'beban',
    data(){
        return{
            kodeAkun:'',
            kode:'5',
            namaAkun:'',
            balance:0,
            items:[],
            editModals: {
                id: "editModal",
                title: "",
                content: "",
            }, 
            fields: [
                {
                key: 'nomor',
                label: "No",
                sortable: true,
                sortDirection: "desc",
                },
                {
                    key: 'kodeAkun',
                    label:'Kode Akun',
                    sortable: true
                },
                {
                    key: 'namaAkun',
                    label: 'Nama Akun',
                    sortable: true
                },
                {
                    key: 'total',
                    label: 'Balance',
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
    mounted() {
        this.getBeban()
    },
    // computed: {
    //     onFiltered() {
    //             // Trigger pagination to update the number of buttons/pages due to filtering
    //             this.totalRows = this.items.length
    //             this.currentPage = 1
    //         },
    // },
    methods: {
        getBeban(){
            axios.get(ipBackend + "/akun/listBeban", {
                headers: {
                token: localStorage.getItem("token"),
                },
            })
            .then((res) => {
                console.log(res)
                this.items = res.data
                console.log(this.items, 'ini this item')
                res.data.forEach((element, index) => {
                    let x = this.items[index]
                    x.nomor = index +1
                    x.total = numeral(res.data[index].total).format('(0,0)')             
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },
        resetModal() {
        this.kodeAkun = ''
        this.namaAkun = ''
        this.balance = 0
        },
        signup(){
            let vm = this;
            let y = `${vm.kode}${vm.kodeAkun}`
            console.log(y,'ini y')
            axios.post(ipBackend + '/akun/register', {
                kodeAkun: y,
                namaAkun:vm.namaAkun,
                balance: vm.balance,
            },
            {
              headers: {
              token: localStorage.getItem("token"),
            },
            },
            )
            .then(res => {
                console.log(res.data,)
                this.$swal("Sukses Asset Telah Terdaftar");
                vm.$nextTick(() => {
                vm.$bvModal.hide('modal-1')
                this.resetModal()
                vm.getBeban()
              })
            })
            .catch(err => {
                console.log(err)
            })
        },
        editModal(item, index, button) {
            this.editModals.content = item;
            this.idEdit = item.id;
            this.kodeAkun = item.kodeAkun;
            this.namaAkun = item.namaAkun;
            this.balance = item.balance;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
      },
      editData() {
            let vm = this;
            axios.post(ipBackend + "/akun/update/" + this.idEdit, {
                    kodeAkun: vm.editModals.content.kodeAkun,
                    namaAkun: vm.editModals.content.namaAkun,
                    balance: vm.editModals.content.balance,
                },
                {
                  headers: {
                    token: localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                console.log(res.data, 'ini responyaaaaaaaaaaaaaaaa');
                this.$swal("Berhasil Mengedit Data");
                let idNew = this.items.findIndex((o) => o.id === this.idEdit);
                vm.items[idNew] = vm.editModals.content;
                this.$root.$emit("bv::hide::modal", "editModal");
                this.getBeban()
              })
              .catch((err) => {
                console.log(err);
              });
      },
      deleteItem(a,b) {
        let data = a
        console.log(data.idakun)
        let vm = this
              axios.post(ipBackend + "/akun/delete/" + data.idakun, {
                id:vm.items[b].idakun, 
              },
              {
                  headers: {
                    token: localStorage.getItem("token"),
                  },
              })
                .then((res) => {
                  console.log(res.data);
                  vm.$swal("berhasil");
                  vm.items.splice(b, 1);
                  
                })
                .catch(function (error) {
                  console.log(error);
                });
    },
    handleClick(a,b){
                this.$confirm(
                    {
                    message: `Yakin ingin menghapus?`,
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
                        this.deleteItem(a,b)
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