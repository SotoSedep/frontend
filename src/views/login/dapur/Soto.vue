<template>
  <div id="dapursoto">
      <headerdapur></headerdapur>
      <b-container>
          <b-row>
        <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
          <div class="box">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>PESANAN SOTO SEDEEP</strong>
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
                    >Pesanan Soto Sedeep</b-breadcrumb-item
                  >
                </b-breadcrumb>
              </b-col>
            </b-row>

            <b-table
              
              show-empty
              borderless
              hover
              ref="table"
              :items="items"
              :fields="fields"
              responsive
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="primary"
                  @click="infoQs(row.item, row.index, $event.target)"
                  class="mr-1"
                >
                  Done
                </b-button>                
              </template>
            </b-table>
            
          </div> 
        </b-col>
      </b-row>
      </b-container>
  </div>
</template>

<script>
import headerdapur from "../../../components/Headerdapur";
export default {
    name: "dapursoto",
    components: {
    headerdapur
    },
    data(){
        return {
            nomorMeja:'',
            nama_menu:'',
            jumlah:'',
            fields: [
                {
                    key: 'nomorMeja',
                    label:'Nomor Meja',
                    sortable: true
                },
                {
                    key: 'nama_menu',
                    label:'Nama Menu',
                    sortable: true
                },
                {
                    key: 'jumlah',
                    label:'Jumlah',
                    sortable: true
                },
                { key: "actions", label: "Actions" },
            ],
            items: [
                { nomor: '1', nomorMeja: '1', nama_menu: 'Soto Ayam', jumlah: '2'},
                { nomor: '2', nomorMeja: '1', nama_menu: 'Soto Daging', jumlah: '3'}, 
            ],
        }
    }
}
</script>

<style>

</style>