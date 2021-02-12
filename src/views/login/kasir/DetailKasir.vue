<template>
  <div id="detailkasir">
    <headerkasir></headerkasir>
    <b-container class="bv-example-row">
      <b-row class="d-none d-sm-block">
        <b-col xs="12" sm="12" md="10" lg="10" offset-md="1" offset-lg="1">
            <b-row>
              <b-col md="12">
                <h3 class="text-center m-t-0 m-b-0" style="margin-top:30px;">
                  <strong>Detail Pesanan</strong>
                </h3>
              </b-col>
            </b-row>

            <b-row class="m-t-15">
              <b-col md="12">
                <b-breadcrumb>
                  <b-breadcrumb-item>
                    <router-link :to="'dashboardkasir'">
                      <b-icon
                        icon="box-arrow-left"
                        scale="1.25"
                        shift-v="1.25"
                        aria-hidden="true"
                      ></b-icon>
                      Back to List
                    </router-link>
                  </b-breadcrumb-item>
                  <b-breadcrumb-item active
                    >Detail Pesanan</b-breadcrumb-item
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
              style=" text-align:center;"
            >
              
            </b-table>
            <b-row>
              <b-col md="6">
                <h4 style="padding-left:10px">Total Harga</h4>
              </b-col>
              <b-col md="6">
                <h4 style="padding-right:80px; text-align:right;">{{total}}</h4>
              </b-col>
            </b-row>
            <b-button @click="handleClick()" variant="primary" class="m-t-15" style="margin:10px;">Bayar</b-button>
        </b-col>
      </b-row>
    </b-container>
   
  </div>
</template>

<script>
import headerkasir from "../../../components/HeaderKasir"
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:"detailkasir",
    components: {
    headerkasir,
  },
  data() {
    return {
      items:[],
      fields:[
        {
          key: 'menu.namaMenu',
          label:'Nama Pesanan',
        },
        {
          key: 'jumlah',
          label:'Jumlah',
        },
        {
          key: 'totalHarga',
          label:'Total Harga',
        },
      ],
      total:0
    }
  },
  mounted() {
    let vm = this;
      axios.get(ipBackend + "/temporary/listByMeja/" + localStorage.getItem("mejaId"), {
      headers: {
        accesstoken: localStorage.getItem("token"),
      },
      })
      .then((res) => {
        console.log(res)
        vm.items = res.data.respon;
        vm.items.forEach((element, index) => {
          vm.total+=vm.items[index].totalHarga
        });
      })
      .catch((err) => {
        console.log(err);
    });
  },
  methods: {
    goRekap(){
      let mejaId = localStorage.getItem("mejaId")
      console.log(mejaId, "iniiiii mejaaaa id")
      axios.post(ipBackend + "/rekap/screening", {
        mejaId : mejaId
      },
      {
        headers: {accesstoken: localStorage.getItem("token"),},
      })
        this.$router.push({ path: "/dashboardkasir" });
    },
    handleClick(){
                this.$confirm(
                    {
                    message: `Yakin ingin membayar?`,
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
                        this.goRekap()
                        }
                    }
                    }
                )
            }
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