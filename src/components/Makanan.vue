<template>
  <div id="makanan">
      <b-table
              show-empty
              borderless
              hover
              ref="tablee"
              :items="cart"
              :fields="fields"
              responsive
              style="width:600px;"
            >
              <template v-slot:cell(actions)="roww">
                <b-button
                  size="sm"
                  variant="success"
                  @click="toCart(roww, $event.target)"
                  class="mr-1"
                >
                  Add to Order
                </b-button>

                <b-input-group style="width:50px; display:flex;">
                        <b-input-group-prepend>
                        <b-btn variant="outline-info" @click="roww.item.jumlah--">-</b-btn>
                        </b-input-group-prepend>

                        <b-form-input style="width:10px;" v-model="roww.item.jumlah"></b-form-input>

                        <b-input-group-append>
                        <b-btn variant="outline-secondary" @click="roww.item.jumlah++">+</b-btn>
                        </b-input-group-append>
                    </b-input-group>
              </template>
            </b-table>
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
        let dt = item.item
      
        this.$emit('kirimCart', dt)
        // axios.post(ipBackend + "temporary/register", {
        //   menuId:this.item.id,
        //   karyawanId: this.localStorage.getItem("idKaryawan"),
        //   mejaId: this.localStorage.getItem("idMeja"),
        //   harga: this.item.harga,
        //   jenis: this.item.jenis
        // })
      }
    },
}
</script>

<style>

</style>