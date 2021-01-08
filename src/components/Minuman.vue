<template>
  <div id="minuman">
      <b-table
              show-empty
              borderless
              hover
              ref="table"
              :items="items"
              :fields="fields"
              responsive
              style="width:600px;"
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="infoQs(row.item, row.index, $event.target)"
                  class="mr-1"
                >
                  Add to Order
                </b-button>
              </template>
            </b-table>
  </div>
</template>

<script>
export default {
    name:'minuman',
    data() {
        return {
            nomor:'',
            nama_menu:'',
            harga:'',
            jenis:'',
            items:[
                { nomor: '1', nama_menu: 'Es Teh', jenis: 'minuman', harga: 12000},
                { nomor: '2', nama_menu: 'Es Jeruk', jenis: 'minuman', harga: 13000},
                { nomor: '3', nama_menu: 'Es Sirup', jenis: 'minuman', harga: 15000},
                { nomor: '4', nama_menu: 'Es Kelapa Muda', jenis: 'minuman', harga: 16000},
            ],
            fields:[
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
                    key: 'harga',
                    label: 'Harga',
                    sortable: true,
                },
                { key: "actions", label: "Actions" },
            ],

        }
    }
}
</script>

<style>

</style>