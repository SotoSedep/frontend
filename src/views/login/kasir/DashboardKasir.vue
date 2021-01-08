<template>
  <div id="dashboardkasir">
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

            <b-table
              show-empty
              bordered
              hover
              ref="table"
              :items="items"
              :fields="fields"
              @filtered="onFiltered"
              responsive
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="primary"
                  @click="infoQs(row.item, row.index, $event.target)"
                  class="mr-1"
                >
                  Detail
                </b-button>
                <b-button
                  size="sm"
                  variant="success"
                  @click="deleteQs(row.item.id)"
                  class="mr-1"
                >
                  Print
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
  </div>
</template>

<script>
import myheader from "../../../components/Header";
export default {
    name: "dashboardkasir",
    components: {
    myheader,
    },
    data(){
        return {
            nomor:'',
            nomorMeja:'',
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
        }
    }
}
</script>

<style>

</style>