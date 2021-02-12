<template>
  <div id="dashboardwaitress">
    <headerwaitress></headerwaitress>
    <b-container fluid>
      <b-row>
        <b-col>
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
    </b-container>
   
  </div>
</template>

<script>
import headerwaitress from "../../../components/HeaderWaitress"
import lantai1 from "../../../components/Lantai1"
import lantai2 from "../../../components/Lantai2"
import axios from 'axios';
import { ipBackend } from "@/config.js";
export default {
    name:"dashboardwaitress",
    components: {
    headerwaitress,
    },
  data() {
    return {
      items:[],
      lantai: [
              lantai1,
              lantai2
            ],
            isActive: 0,
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