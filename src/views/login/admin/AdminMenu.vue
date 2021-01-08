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
      title="Submit Your Name"
      centered
      hide-footer
      hide-header
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
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
          <b-form-radio v-model="jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="cemilan">Cemilan</b-form-radio>
          <b-form-radio v-model="jenis" :aria-describedby="ariaDescribedby" name="some-radios" value="minuman">Minuman</b-form-radio>
        </b-form-group>
         <b-button @click="signup()" variant="primary" class="m-t-15">Tambah</b-button>
    </b-modal>
  </div>
</template>

<script>
import myheader from "../../../components/Header";
export default {
    name: "adminmenu",
    components: {
    myheader,
  },
  data() {
      return {
        nomor: '',
        nama_menu: '',
        harga: '',
        jenis: null,
        jenisop: [{ text: 'Silahkan Pilih', value: null }, 'soto', 'makanan', 'cemilan', 'minuman'],
        items: [
          { nomor: '1', nama_menu: 'Soto Ayam', jenis: 'soto', harga: 12000},
          { nomor: '2', nama_menu: 'Nasi Goreng Iga', jenis: 'makanan', harga: 30000},
          { nomor: '3', nama_menu: 'Es Jeruk', jenis: 'minuman', harga: 7000},
          { nomor: '4', nama_menu: 'Tempe', jenis: 'cemilan', harga: 1000},
        ],
        fields: [
          {
          key: "nomor",
          label: "No",
          sortable: true,
          sortDirection: "desc",
          },
          {
            key: 'nama_menu',
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
}
</script>

<style>
    
</style>