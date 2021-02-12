<template>
  <div id="adminmeja">
    <headeradmin></headeradmin>
    <b-container>
      <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA MEJA SOTO SEDEEP</strong>
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
                    >Data Meja Soto Sedeep</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>

            <b-row style="margin-bottom:10px;">
              <b-col>
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
              style="text-align:center;"
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
          label="No. Meja"
        >
          <b-form-input
            v-model="nomorMeja"
            required
            placeholder="Silahkan isi No. Meja"
          ></b-form-input>
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
        
  
        <b-form-group 
            label="No. Meja" 
        >
        <b-form-input
            v-model="editModals.content.nomorMeja"
            placeholder="Silahkan Isi Nama Menu"
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
    name: "adminmeja",
    components: {
    headeradmin,
  },
  data() {
      return {
        nomorMeja: '',
        fields: [
            {
                key: 'nomorMeja',
                label:'Nomor Meja',
                sortable: true
            },
            { key: "actions", label: "Actions" },
        ],
        items: [],
        editModals: {
          id: "editModal",
          title: "",
          content: "",
        },
      }
    },
  mounted() {
        axios.get(ipBackend + "/meja/all", {
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
            axios.post(ipBackend + '/meja/register', {
                nomorMeja:vm.nomorMeja,
            },
            {
              headers: {
              accesstoken: localStorage.getItem("token"),
            },
            })
            .then(res => {
                console.log(res.data)
                this.$swal("Berhasil Menambah Nomor Meja");
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
            this.nomorMeja = item.nomorMeja;
            this.$root.$emit("bv::show::modal", this.editModals.id, button);
            console.log(this.idEdit);
      },
      editData() {
            let vm = this;
            axios.post(ipBackend + "/meja/update/" + this.idEdit, {
                  nomorMeja: this.editModals.content.nomorMeja,
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
              axios.delete(ipBackend + "/meja/delete/" + idData, {
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