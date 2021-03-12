<template>
  <div id="myheader">
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
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>


export default {
  name: "myheader",
  data() {
    return {};
  },
};
</script>

<style scoped>
#myheader .bgheader {
  background-color:rgb(251, 162, 57);
  box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.2);
}

#myheader .bgheader .partone {
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  font-family: 'Pattaya', sans-serif;
}

#myheader .bgheader .parttwo {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#myheader .bgheader .parttwo img {
  border-radius: 100%;
}
#myheader .bgheader .parttwo .account {
  display: flex;
  height: 8vh;
  align-items: center;
  padding-bottom: 60px;
  /* background-color: red; */
}
#myheader .bgheader .parttwo .accountname {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
}

#myheader .bgheader .parttwo .account :nth-child(1) {
  order: 2;
}
#myheader .bgheader .parttwo .account :nth-child(2) {
  order: 1;
}

#myheader .bgheader .parttwo .accountname :nth-child(1) {
  order: 1;
}
#myheader .bgheader .parttwo .accountname :nth-child(2) {
  order: 2;
}

#myheader .bgheader .parttwo .account h5,
h6 {
  text-align: right;
  color: #2c3e50;
}
</style>