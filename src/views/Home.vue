<template>
  <div id="home">
      <b-container>
        <b-row>
          <b-col md="12" xs="12"> 
            
              <router-link :to="'login'">
                <button style=" background-color: Transparent; color:rgb(248, 166, 48); top:0px; right:100px; border: none; font-size:50px;">Login</button>
              </router-link>
          </b-col>
          <b-col md="12" xs="12"> 
            <img src="../assets/soto3.jpeg" width="100%">
          </b-col>
        </b-row>
      </b-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  data (){
   return{
     
   };
 }
}
</script>

<style scoped>
  #home{
  background-color: #282828;
  display: flex;
  flex-wrap: wrap;
  /* background-position: 100% ; */
}
</style>