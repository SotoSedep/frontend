<template>
  <div id="adminkaryawan">
    <headeradmin></headeradmin>
    <b-container>
      <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA KARYAWAN SOTO SEDEEP</strong>
                </h3>
              </b-col>
            </b-row>

            <b-row class="m-t-15">
              <b-col md="12">
                <b-breadcrumb>
                  <b-breadcrumb-item>
                    <router-link :to="'dashboardadmin'">
                      <b-icon
                        icon="house-fill"
                        scale="1.25"
                        shift-v="1.25"
                        aria-hidden="true"
                      ></b-icon>
                      Dashboard
                    </router-link>
                  </b-breadcrumb-item>
                  <b-breadcrumb-item active
                    >Data Karyawan Soto Sedeep</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>

            <b-row class="m-t-30" style="margin-bottom:10px;">
              <b-col md="12">
                <b-button v-b-modal.modal-1 variant="primary"
                  >Tambah Data</b-button
                >
              </b-col>
            </b-row>

            <b-table
              show-empty
              bordered
              hover
              ref="table"
              :items="items"
              :fields="fields"
              responsive
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
    <h2 class="text-center" style="margin-bottom:10px;">Tambah Karyawan</h2>
        <b-form-group label="Pilih Role :" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="role" :aria-describedby="ariaDescribedby" name="some-radios" value="waitress">Waitress</b-form-radio>
          <b-form-radio v-model="role" :aria-describedby="ariaDescribedby" name="some-radios" value="kasir">Kasir</b-form-radio>
        </b-form-group>

        <b-form-group 
        label="Username" 
        >
          <b-form-input
            v-model="username"
            required
            placeholder="Silahkan Isi Username"
          ></b-form-input>
        </b-form-group>
        
        <b-form-group 
        label="Password" 
        >
          <b-form-input
            type="password"
            v-model="password"
            required
            placeholder="Silahkan Isi Password"
          ></b-form-input>
        </b-form-group>
        <b-form-group 
            label="Nama" 
        >
        <b-form-input
            v-model="nama"
            placeholder="Silahkan Isi Nama"
        ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Alamat" 
        >
        <b-form-input
            v-model="alamat"
            placeholder="Silahkan Isi Alamat"
        ></b-form-input>
        </b-form-group>


        <b-form-group 
            label="No Handphone" 
        >
        <b-form-input
            v-model="handphone"
            placeholder="Silahkan Isi No. Handphone"
        ></b-form-input>
        </b-form-group>
        <b-button @click="signup()" variant="primary" class="m-t-15">Register</b-button>
    </b-modal>
    <!-- edit -->
    <b-modal
      :id="editModals.id"
      ref="modal"
      hide-footer
      hide-header
    
    >
    <h2 class="text-center" style="margin-bottom:10px;">Edit Data Karyawan</h2>
        <b-form-group label="Pilih Role :" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="editModals.content.role" :aria-describedby="ariaDescribedby" name="some-radios" value="waitress">Waitress</b-form-radio>
          <b-form-radio v-model="editModals.content.role" :aria-describedby="ariaDescribedby" name="some-radios" value="kasir">Kasir</b-form-radio>
        </b-form-group>
  
        <b-form-group 
            label="Nama" 
        >
        <b-form-input
            v-model="editModals.content.nama"
            placeholder="Silahkan Isi Nama"
        ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Alamat" 
        >
        <b-form-input
            v-model="editModals.content.alamat"
            placeholder="Silahkan Isi Alamat"
        ></b-form-input>
        </b-form-group>


        <b-form-group 
            label="No Handphone" 
        >
        <b-form-input
            v-model="editModals.content.handphone"
            placeholder="Silahkan Isi No. Handphone"
        ></b-form-input>
        </b-form-group>
        <b-button @click="editData()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>
  </div>
</template>

<script>
import headeradmin from "../../../components/HeaderAdmin";
import axios from 'axios';
import { ipBackend } from "@/config.js";
 export default {
     name: "adminkaryawan",
        components: {
          headeradmin,
        },
    data() {
      return {
        username: '',
        password: '',
        nama: '',
        alamat: '',
        role: null,
        roleop: [{ text: 'Silahkan Pilih', value: null }, 'Waitress', 'Kasir'],
        handphone: '',
        // editnama:'',
        // editalamat:'',
        // editrole:'',
        // edithandphone:'',
        idEdit: '',
        items: [],
        editModals: {
          id: "editModal",
          title: "",
          content: "",
        },
        fields: [
          {
          key: "id",
          label: "No",
          sortable: true,
          sortDirection: "desc",
          },
          {
            key: 'username',
            label:'Username',
            sortable: true
          },
          {
            key: 'nama',
            label: 'Nama',
            sortable: true
          },
          {
            key: 'alamat',
            label: 'Alamat',
            sortable: true,
          },
          {
            key: 'handphone',
            label: 'No. Handphone',
            sortable: true
          },
          {
            key: 'role',
            label: 'Role',
            sortable: true
          },
          { key: "actions", label: "Actions" },
          ],
      }
    },
    mounted() {
        axios.get(ipBackend + "/karyawan/all", {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        this.items = res.data.respon;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    methods: {

      resetModal() {
        this.username = ''
        this.password = ''
        this.nama = ''
        this.alamat = ''
        this.role = null
        this.handphone = ''
      },

      signup(){
            let vm = this;
            axios.post(ipBackend + '/karyawan/register', {
                username:vm.username,
                password:vm.password,
                nama:vm.nama,
                alamat:vm.alamat,
                role:vm.role,
                handphone:vm.handphone,
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            },
            },
            )
            .then(res => {
                console.log(res.data)
                this.$swal("Sukses Karyawan Telah Terdaftar");
                vm.$nextTick(() => {
                vm.$bvModal.hide('modal-1')
              })
            })
            .catch(err => {
                console.log(err)
            })
        },
      editModal(item, index, button) {
            this.editModals.content = item;
            this.idEdit = item.id;
            this.nama = item.nama;
            this.alamat = item.alamat;
            this.role = item.role;
            this.handphone = item.handphone;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
      },
      editData() {
            let vm = this;
            axios.post(ipBackend + "/karyawan/update/" + this.idEdit, {
                  nama: this.editModals.content.nama,
                  alamat: this.editModals.content.alamat,
                  role: this.editModals.content.role,
                  handphone: this.editModals.content.handphone,
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
                this.$root.$emit("bv::hide::modal", "editModal");
              })
              .catch((err) => {
                console.log(err);
              });
      },
      deleteItem(idData) {
              axios.delete(ipBackend + "/karyawan/delete/" + idData, {
                  headers: {
                    accesstoken: localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  this.$swal("berhasil");
                  let idDelete = this.items.findIndex((o) => o.id === idData);
                  this.items.splice(idDelete, 1);
                  this.$root.$emit("bv::hide::modal");
                })
                .catch(function (error) {
                  console.log(error);
                });
    },
    handleClick(idData){
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
                        this.deleteItem(idData)
                        }
                    }
                    }
                )
            }
    }
  }
</script>

<style>
    
</style>