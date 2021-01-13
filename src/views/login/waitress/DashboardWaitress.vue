<template>
  <div id="dashboardadmin">
    <myheader></myheader>
    <b-container class="bv-example-row">
      <b-row class="d-none d-sm-block">
        <b-col xs="12" sm="12" md="10" lg="10" offset-md="1" offset-lg="1">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0" style="margin-top:30px;">
                  <strong>Pilih Nomor Meja</strong>
                </h3>
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
              style="width:600px; text-align:center;"
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="success"
                  @click="goMenu(row.item)"
                  class="mr-1"
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
import myheader from "../../../components/Header"
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:"dashboardwaitress",
    components: {
    myheader,
  },
  data() {
    return {
      items:[],
      // menu: {
      //     idMeja: "menu",
      //     title: "",
      //     content: "",
      //   },
      fields:[
        {
          key: 'nomorMeja',
          label:'Nomor Meja',
        },
        { key: "actions", label: "Actions" },
      ]
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
    goMenu(item) {
            let idMeja = item.id;
            localStorage.setItem('idMeja', idMeja);
            this.$router.push({ path: "/menuwaitress" });
            console.log(idMeja);
    },
  }
}
</script>

<style scoped>
.partone {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  height: 90vh;
}



</style>>