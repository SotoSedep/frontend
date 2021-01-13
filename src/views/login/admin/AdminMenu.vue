<template>
  <div id="adminmenu">
    <myheader></myheader>
    <b-container>
      <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA MENU SOTO SEDEEP</strong>
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
                    >Data Menu Soto Sedeep</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>

            <b-row class="m-t-30" style="margin-bottom:10px;">
              <b-col md="12">
                <b-button v-b-modal.modal-1 variant="primary">Tambah Data</b-button>
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
                  @click="deleteItem(row.item.id)"
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
    <b-modal
      id="modal-1"
      ref="modal"
      title="Submit Your Name"
      centered
      hide-footer
      hide-header
    >
      <h2 class="text-center">Tambah Data</h2>
        <b-form-group
          label="Nama Menu"
        >
          <b-form-input
            placeholder="Silahkan isi Nama Menu"
            v-model="namaMenu"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          label="Harga"
        >
          <b-form-input
            placeholder="Silahkan isi Harga"
            v-model="harga"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label="Pilih Jenis :" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="soto">Soto</b-form-radio>
          <b-form-radio v-model="jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="makanan">Makanan</b-form-radio>
          <b-form-radio v-model="jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="minuman">Minuman</b-form-radio>
        </b-form-group>
         <b-button @click="tambahData()" variant="primary" class="m-t-15">Tambah</b-button>
    </b-modal>

    <!-- edit -->
    <b-modal
      :id="editModals.id"
      ref="modal"
      hide-footer
      hide-header
    
    >
    <h2 class="text-center" style="margin-bottom:10px;">Edit Menu</h2>
        <b-form-group label="Pilih Role :" v-slot="{ ariaDescribedby }">
          <b-form-radio v-model="editModals.content.jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="soto">Soto</b-form-radio>
          <b-form-radio v-model="editModals.content.jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="makanan">Makanan</b-form-radio>
          <b-form-radio v-model="editModals.content.jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="minuman">Minuman</b-form-radio>
        </b-form-group>
  
        <b-form-group 
            label="Nama Menu" 
        >
        <b-form-input
            v-model="editModals.content.namaMenu"
            placeholder="Silahkan Isi Nama Menu"
        ></b-form-input>
        </b-form-group>

        <b-form-group 
            label="Harga" 
        >
        <b-form-input
            v-model="editModals.content.harga"
            placeholder="Silahkan Isi Harga"
        ></b-form-input>
        </b-form-group>
        <b-button @click="editData()" variant="primary" class="m-t-15">Simpan</b-button>
    </b-modal>

  </div>
</template>

<script>
import myheader from "../../../components/Header";
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name: "adminmenu",
    components: {
    myheader,
  },
  data() {
      return {
        namaMenu: '',
        harga: '',
        jenis: null,
        jenisop: [{ text: 'Silahkan Pilih', value: null }, 'soto', 'makanan', 'cemilan', 'minuman'],
        items: [],
        fields: [
          {
          key: "id",
          label: "No",
          sortable: true,
          sortDirection: "desc",
          },
          {
            key: 'namaMenu',
            label:'Nama Menu',
            sortable: true
          },
          {
            key: 'jenis',
            label: 'Jenis Menu',
            sortable: true
          },
          {
            key: 'harga',
            label: 'Harga',
            sortable: true,
          },
          { key: "actions", label: "Actions" },
          ],
        editModals: {
          id: "editModal",
          title: "",
          content: "",
        },
      }
    },
    mounted() {
          axios.get(ipBackend + "/menu/all", {
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

      tambahData(){
            let vm = this;
            axios.post(ipBackend + '/menu/register', {
                namaMenu:vm.namaMenu,
                harga:vm.harga,
                jenis:vm.jenis,
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            },
            })
            .then(res => {
                console.log(res.data)
                alert("Berhasil Menambah Menu");
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
            this.namaMenu = item.namaMenu;
            this.harga = item.harga;
            this.jenis = item.jenis;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
      },
      editData() {
            let vm = this;
            axios.post(ipBackend + "/menu/update/" + this.idEdit, {
                  namaMenu: this.editModals.content.namaMenu,
                  harga: this.editModals.content.harga,
                  jenis: this.editModals.content.jenis,
                },
                {
                  headers: {
                    accesstoken: localStorage.getItem("token"),
                  },
                }
              )
              .then((res) => {
                console.log(res.data, 'ini responyaaaaaaaaaaaaaaaa');
                alert("Berhasil Mengedit Data");
                let idNew = this.items.findIndex((o) => o.id === this.idEdit);
                vm.items[idNew] = vm.editModals.content;
                this.$root.$emit("bv::hide::modal", "editModal");
              })
              .catch((err) => {
                console.log(err);
              });
      },
      deleteItem(idData) {
              axios.delete(ipBackend + "/menu/delete/" + idData, {
                  headers: {
                    accesstoken: localStorage.getItem("token"),
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  alert("berhasil");
                  let idDelete = this.items.findIndex((o) => o.id === idData);
                  this.items.splice(idDelete, 1);
                  this.$root.$emit("bv::hide::modal");
                })
                .catch(function (error) {
                  console.log(error);
                });
    },
    }
}
</script>

<style>
    
</style>