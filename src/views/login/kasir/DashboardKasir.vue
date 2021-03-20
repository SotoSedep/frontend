<template>
  <div id="dashboardkasir">
      <headerkasir></headerkasir>
      <b-container style="display:flex">
        
      <b-row>
        <b-col md=12>
          <div class="tabs" style="display:flex;align-items:center;justify-content:center">
            <b-button variant="primary" style="margin:10px;" :class="isActive === 0? 'is-active': ''" @click="isActive = 0">Lantai 1</b-button>
            <b-button variant="primary" style="margin:10px;" :class="isActive === 1? 'is-active': ''" @click="isActive = 1">Lantai 2</b-button>  
          </div>
          <div class="content">
            <div class="wrapper">
                <component :is="lantai[isActive]"></component>
            </div>                      
          </div>
        </b-col>
      </b-row>
      <b-row style="margin-left:20px">
        <b-col md="12" style="margin-top: 20px; margin-bottom: 20px">
          <div class="box">
            <b-row>
              <b-col>
                <h3 class="text-center m-t-0 m-b-0">
                  <strong>DATA MEJA SOTO SEDEEP</strong>
                </h3>
              </b-col>
            </b-row>
            <b-table
              show-empty
              borderless
              hover
              ref="table"
              :items="itemsData"
              :fields="fields"
              responsive
              style=" text-align:center;"
            >
              <template v-slot:cell(actions)="row">
                <b-button
                  size="sm"
                  variant="primary"
                  @click="detailItem(row.item, row.index, $event.target)"
                  class="mr-1"
                >
                  Detail
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
import headerkasir from "../../../components/HeaderKasir";
import lantai1 from "../../../components/Lantai1"
import lantai2 from "../../../components/Lantai2"
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name: "dashboardkasir",
    components: {
    headerkasir,
    },
    data(){
        return {
            items:[],
            itemsData:[],
            fields:[
                {
                    key: 'DISTINCT',
                    label:'Nomor Meja',

                },
                {
                    key: 'atasNama',
                    label:'Nama Pemesan',

                },
                { key: "actions", label: "Actions" },
            ],
            abang:'abang',
            kuning:'kuning',
            lantai: [
              lantai1,
              lantai2
            ],
            isActive: 0,
        }
    },
    mounted() {
        this.loadData()
    },
  sockets: {
      connect: function(){
        console.log('ada yg connect')
      },
      refresh: function(){
        this.loadData()
      }
    },
    methods: {
      loadData(){
        axios.get(ipBackend + "/temporary/dashboardkasir", {
        headers: {
          accesstoken: localStorage.getItem("token"),
        },
      })
      .then((res) => {       
        console.log(res, "ini resnyaa")
        this.itemsData = res.data
        console.log(this.itemsData, "ini itemnyaaaaaaaaaaaaaaa")
      })
      .catch((err) => {
        console.log(err);
      });
      },
      detailItem(item) {
            let mejaId = item.DISTINCT;
            localStorage.setItem('mejaId', mejaId);
            this.$router.push({ path: "/detailkasir" });
            console.log(mejaId);
      },
    }
}
</script>

<style scoped>
  .avatar1 {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:green;
    }
    .kuning {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        color:black;
        background-color:yellow !important;
    }
    .abang {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:red;
    }
    .avatar2 {
        margin:20px;
        font-size:30px;
        font-weight: bold;
        background-color:green;
    }
    .avatar3 {
        margin:20px;
        width:200px;height:60px;
        font-size:30px;
        font-weight: bold;
    }
</style>