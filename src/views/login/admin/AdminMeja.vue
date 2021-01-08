<template>
  <div id="adminmeja">
    <myheader></myheader>
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
          label="No. Meja"
        >
          <b-form-input
            v-model="nomeja"
            required
            placeholder="Silahkan isi No. Meja"
          ></b-form-input>
        </b-form-group>
        <b-button @click="signup()" variant="primary" class="m-t-15">Tambah</b-button>
    </b-modal>
  </div>
</template>

<script>
import myheader from "../../../components/Header";
export default {
    name: "adminmeja",
    components: {
    myheader,
  },
  data() {
      return {
        nomor:'',
        nomorMeja: '',
        nameState: null,
        submittedNames: [],
        fields: [
            {
            key: "nomor",
            label: "No",
            sortable: true,
            sortDirection: "desc",
            },
            {
                key: 'nomorMeja',
                label:'Nomor Meja',
                sortable: true
            },
            { key: "actions", label: "Actions" },
        ],
        items: [
            { nomor: '1', nomorMeja: 'Meja 1'},
            { nomor: '2', nomorMeja: 'Meja 2'},
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