<template>
  <div id="dashboardadmin">
    <headeradmin></headeradmin>
    <b-container class="bv-example-row">
      <b-row class="d-none d-sm-block">
        <b-col xs="12" sm="12" md="10" lg="10" offset-md="1" offset-lg="1">
          <div class="partone">
            <div class="boxmenu" style="margin-top:100px;">
              
                <center>
                  <router-link
                    :to="'adminkaryawan'"
                    style="text-decoration: none; color: #333"
                  >
                  <img
                    src="../../../assets/soto3.jpeg"
                    style="height: 100px"
                  />
                  </router-link>
                  <h5 class="m-t-15 m-b-0"><strong>MASTER</strong></h5>
                  <h6 class="m-t-0 m-b-0"><strong>KARYAWAN</strong></h6>
                </center>
              
            </div>

            <div class="boxmenu" style="margin-top:50px;">
             
                <center>
                  <router-link
                    :to="'adminmenu'"
                    style="text-decoration: none; color: #333"
                  >
                  <img
                    src="../../../assets/soto3.jpeg"
                    style="height: 100px"
                  />
                  </router-link>
                  <h5 class="m-t-15 m-b-0"><strong>MASTER</strong></h5>
                  <h6 class="m-t-0 m-b-0"><strong>MENU</strong></h6>
                </center>
             
            </div>

            <div class="boxmenu" style="margin-top:50px;">
             
                <center>
                  <router-link
                    :to="'admingrafik'"
                    style="text-decoration: none; color: #333"
                  >
                  <img
                    src="../../../assets/soto3.jpeg"
                    style="height: 100px"
                  />
                  </router-link>
                  <h5 class="m-t-15 m-b-0"><strong>GRAFIK</strong></h5>
                  <h6 class="m-t-0 m-b-0"><strong>PENJUALAN</strong></h6>
                </center>
              
            </div>
            
          </div>
        </b-col>
      </b-row>
    </b-container>
    
  </div>
</template>

<script>
import headeradmin from "../../../components/HeaderAdmin"
export default {
    name:"dashboardadmin",
    components: {
    headeradmin,
  },
  data(){
    return {

    }
  },

}
</script>

<style scoped>
#dashboard .partone {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  height: 90vh;
}

#dashboard .partone .boxmenu {
  width: 100px;
  background-color: #fff;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 0px 15px;
  border-radius: 8px;
  margin-top: 30px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* #dashboard .partone .boxmenu img{
  border-radius: 100%;
} */

#dashboard .parttwo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 520px;
  background-color: pink;
}

#dashboard .parttwo .boxmenu {
  width: 100px;
  background-color: #fff;
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.3);
  padding: 0px 15px;
  border-radius: 8px;
  margin-top: 30px;
  height: 300px;
  display: flex;
  justify-content: center;
  justify-content: center;
  align-items: center;
  align-items: center;
}

#dashboard .parttwo .boxmenu img {
  border-radius: 100%;
}
</style>>