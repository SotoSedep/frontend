<template>
  <div id="headerkasir">
    <section class="bgheader">
      <b-container>
        <b-row>
          <b-col cols="9" md="8" lg="8">
            <div class="partone">
              <h4 class="m-t-0 m-b-0">
                <strong style="font-size:70px;">Soto Sedeep</strong>
              </h4>
            </div>
          </b-col>

          <b-col cols="3" md="4" lg="4">
            <div class="parttwo">
              <b-dropdown
                right
                variant="link"
                toggle-class="text-decoration-none"
                no-caret
              >
                <template v-slot:button-content>
                  <div class="account">
                    <img src="../assets/user.png" style="height: 6vh" />
                  </div>
                </template>
                <b-dropdown-item v-on:click="signout()"
                  >Logout</b-dropdown-item
                >
                <b-dropdown-item v-on:click="rekap()"
                  >Lihat Rekap</b-dropdown-item
                >
              </b-dropdown>
              
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>


export default {
  name: "headerkasir",
  data() {
    return {};
  },
  methods:{  
    signout(){
      localStorage.setItem('token', '')
      localStorage.setItem('idKaryawan', '')
      localStorage.setItem('idMeja', '')
      this.$router.push({ name: "login"})
    },
    rekap(){
      
      this.$router.push({ name: "rekapkasir"})
    },
  }
};
</script>

<style scoped>
#headerkasir .bgheader {
  background-color:rgb(251, 162, 57);
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.2);
}

#headerkasir .bgheader .partone {
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  font-family: 'Qwigley', cursive;
}

#headerkasir .bgheader .parttwo {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#headerkasir .bgheader .parttwo img {
  border-radius: 100%;
}
#headerkasir .bgheader .parttwo .account {
  display: flex;
  height: 8vh;
  align-items: center;
 
  /* background-color: red; */
}
#headerkasir .bgheader .parttwo .accountname {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

#headerkasir .bgheader .parttwo .account :nth-child(1) {
  order: 2;
}
#headerkasir .bgheader .parttwo .account :nth-child(2) {
  order: 1;
}

#headerkasir .bgheader .parttwo .accountname :nth-child(1) {
  order: 1;
}
#headerkasir .bgheader .parttwo .accountname :nth-child(2) {
  order: 2;
}

#headerkasir .bgheader .parttwo .account h5,
h6 {
  text-align: right;
  color: #2c3e50;
}
</style>