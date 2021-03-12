<template>
  <div id="home">
      <b-container>
        <b-row>
          <b-col md="12" xs="12"> 
            
              <router-link :to="'login'">
                <button style=" background-color: Transparent; color:rgb(248, 166, 48); top:0px; right:100px; border: none; font-size:50px;">Login</button>
              </router-link>
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
  #home {
  background: url("../assets/soto3.jpeg") no-repeat center center fixed; 
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    height: 100vh;
}
</style>