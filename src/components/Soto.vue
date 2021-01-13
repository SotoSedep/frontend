<template>
  <div id="soto">
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
                  @click="toCart(row.item, $event.target)"
                  class="mr-1"
                >
                  Add to Order
                </b-button>
              </template>
            </b-table>
  </div>
</template>

<script>
import { ipBackend } from "@/config.js";
import axios from 'axios';
export default {
    name:'soto',
    data() {
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
        }
    },
    mounted() {
        axios.get(ipBackend + "/menu/listByJenis/soto", {
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
      toCart(item) {
        this.cart.push(item)
        console.log(this.cart);
      }
    },
}
</script>

<style>

</style>