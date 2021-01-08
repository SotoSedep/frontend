<template>
  <div id="adminkaryawan">
    <myheader></myheader>
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
              :current-page="currentPage"
              :per-page="perPage"
              :filter="filter"
              :filter-included-fields="filterOn"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              :sort-direction="sortDirection"
              @filtered="onFiltered"
              responsive
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="warning"
                  @click="infoQs(row.item, row.index, $event.target)"
                  class="mr-1"
                >
                  Edit
                </b-button>
                <b-button
                  size="sm"
                  variant="danger"
                  @click="deleteQs(row.item.id)"
                  class="mr-1"
                >
                  Hapus
                </b-button>
              </template>
            </b-table>
            <b-row>
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
          </div> 
        </b-col>
      </b-row>
    </b-container>

    <!-- MODAL -->
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
            required
            placeholder="Silahkan Isi Nama"
        ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Alamat" 
        >
        <b-form-input
            v-model="alamat"
            required
            placeholder="Silahkan Isi Alamat"
        ></b-form-input>
        </b-form-group>


        <b-form-group 
            label="No Handphone" 
        >
        <b-form-input
            v-model="handphone"
            required
            placeholder="Silahkan Isi No. Handphone"
        ></b-form-input>
        </b-form-group>
        <b-button @click="signup()" variant="primary" class="m-t-15">Register</b-button>
    </b-modal>
  </div>
</template>

<script>
import myheader from "../../../components/Header";
import axios from 'axios';
import { ipBackend } from "@/config.js";
 export default {
     name: "adminkaryawan",
        components: {
          myheader,
        },
    data() {
      return {
        nomor:'',
        username: '',
        password: '',
        nama: '',
        alamat: '',
        role: null,
        roleop: [{ text: 'Silahkan Pilih', value: null }, 'Waitress', 'Kasir'],
        handphone: '',
        items: [
          { nomor: '1', username: 'puka', nama: 'Satrio Purbo W', alamat: 'durian utara', handphone: '0821321321', role: 'Waitress'},
          { nomor: '2', username: 'adhit', nama: 'Adhitya T', alamat: 'durian utara', handphone: '0821321321', role: 'Waitress'},
          { nomor: '3', username: 'gembel', nama: 'Bhagas', alamat: 'durian utara', handphone: '0821321321', role: 'Kasir'},
        ],
        fields: [
          {
          key: "nomor",
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
        totalRows: 1,
        currentPage: 1,
        perPage: 5,
        pageOptions: [5, 10, 15, 50, 100],
        sortBy: "",
        sortDesc: false,
        sortDirection: "asc",
        filter: null,
        filterOn: [],
      }
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
                handphone:vm.handphone
            })
            .then(res => {
                console.log(res.data)
                alert("Berhasil Mengisi Jawaban");
                vm.$nextTick(() => {
                vm.$bvModal.hide('modal-prevent-closing')
              })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
  }
</script>

<style>
    
</style>