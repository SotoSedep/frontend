<template>
  <div id="makanan">
    <b-container>
      <b-row>
        <b-col md="12" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
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
      <b-row>
        <b-col md="12">
          <b-table
              show-empty
              borderless
              hover
              :items="cart"
              :fields="fields"
              responsive
              :filter="filter"
              :filter-included-fields="filterOn"
              @filtered="onFiltered"
              style="width:100%;"
            >
              <template v-slot:cell(actions)="roww">
                <b-input-group style="width:105px">
                        <b-input-group-prepend>
                        <b-btn variant="outline-info" @click="roww.item.jumlah--">-</b-btn>
                        </b-input-group-prepend>

                        <b-form-input style="width:5px;" v-model="roww.item.jumlah"></b-form-input>

                        <b-input-group-append>
                        <b-btn variant="outline-secondary" @click="roww.item.jumlah++">+</b-btn>
                        </b-input-group-append>
                </b-input-group>

                <b-button
                  size="sm"
                  :variant="[(roww.item.jumlah !== 0 ? 'success' : 'secondary')]"
                  @click="toCart(roww, $event.target)"
                  class="mr-1"
                  style="margin:10px; justify-content:center; align-items:center; display:flex;"
                >
                  Add to Order
                </b-button>
              </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name:'makanan',
    data: function (){
        return {
            items:[],
            fields:[
                {
                    key: 'namaMenu',
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
            cart:[],
            filter: null,
            filterOn: [],
            
        }
    },
    mounted() {
        axios.get(ipBackend + "/menu/listByJenis/makanan", {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        
        res.data.respon.forEach((element, index) => {
          res.data.respon[index].jumlah = 0
        });
        this.cart = res.data.respon;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    methods: {
      toCart(item) {
        // this.cart.push(item.item)

              let x ={}
        x.id = item.item.id
        x.harga = item.item.harga
        x.jenis = item.item.jenis
        x.jumlah = item.item.jumlah
        x.namaMenu = item.item.namaMenu
        x.keterangan = ''
        if(x.jumlah !== 0){
          this.$emit('kirimCart', x)
        }
        else{
          alert('Jumlah order minimal 1')
        }
        item.item.jumlah = 0
        // axios.post(ipBackend + "temporary/register", {
        //   menuId:this.item.id,
        //   karyawanId: this.localStorage.getItem("idKaryawan"),
        //   mejaId: this.localStorage.getItem("idMeja"),
        //   harga: this.item.harga,
        //   jenis: this.item.jenis
        // })
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        
      }
    },
}
</script>

<style>

</style>