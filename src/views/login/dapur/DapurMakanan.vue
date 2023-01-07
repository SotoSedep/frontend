<template>
  <div id="dapur">
    <b-container fluid>
      <div class="card">
        <b-card
          v-for="(item, index) in items"
          :key="index"
          style="margin:10px; color:white; width: 100%;"
          bg-variant="dark"
        >
          <b-row>
            <b-col style="display:flex;flex-direction:warp">
              <b-row>
                <div>
                  <h3 style="font-weight:bold; margin-left: 20px">
                    {{ item.mejaId }}
                  </h3>
                </div>
                <div>
                  <h3 style="font-weight:bold; margin-left: 20px">
                    {{ item.namaPemesan }}
                  </h3>
                </div>
                <b-button
                  size="sm"
                  variant="success"
                  @click="doneAll(item)"
                  class="mr-1"
                  style="margin-left:130px;width:80px"
                >
                  Done All
                </b-button>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-table
                dark
                small
                show-empty
                borderless
                hover
                ref="table"
                :items="item.pesanan"
                :fields="fields"
                responsive
              >
                <template v-slot:cell(namaMenu)="item">
                  <p
                    :class="[
                      item.item.jenis == 'makanan' ? abang : '',
                      item.item.jenis == 'makanan' && item.item.status == 1
                        ? abangcoret
                        : '',
                      item.item.status == 1 ? coret : '',
                    ]"
                  >
                    {{ item.item.namaMenu }}
                  </p>
                </template>
                <template v-slot:cell(jumlah)="item">
                  <p
                    :class="[
                      item.item.jenis == 'makanan' ? abang : '',
                      item.item.jenis == 'makanan' && item.item.status == 1
                        ? abangcoret
                        : '',
                      item.item.status == 1 ? coret : '',
                    ]"
                  >
                    {{ item.item.jumlah }}
                  </p>
                </template>
                <template v-slot:cell(keterangan)="item">
                  <p
                    :class="[
                      item.item.jenis == 'makanan' ? abang : '',
                      item.item.jenis == 'makanan' && item.item.status == 1
                        ? abangcoret
                        : '',
                      item.item.status == 1 ? coret : '',
                    ]"
                  >
                    {{ item.item.keterangan }}
                  </p>
                </template>
                <template v-slot:cell(actions)="item">
                  <b-button
                    v-if="item.item.status == 0"
                    size="sm"
                    variant="primary"
                    @click="done(item.item, item.index, $event.target)"
                    class="mr-1"
                  >
                    Done
                  </b-button>
                  <b-button
                    v-if="item.item.status == 0"
                    size="sm"
                    variant="danger"
                    @click="handleClick(item.item, item.index, $event.target)"
                    class="mr-1"
                  >
                    Cancel
                  </b-button>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
import { ipBackend } from "@/config.js";
import axios from "axios";
export default {
  name: "dapur",
  data() {
    return {
      fields: [
        {
          key: "namaMenu",
          label: "Menu",
          // class: 'font-weight-bold'
        },
        {
          key: "jumlah",
          label: "Jumlah",
          class: "text-center",
        },
        {
          key: "keterangan",
          label: "Keterangan",
          class: "text-center",
        },
        { key: "actions", label: "Actions" },
      ],
      items: [],
      abang: "abang",
      abangcoret: "abangcoret",
      coret: "coret",
    };
  },
  mounted() {
    this.loadData();
  },
  sockets: {
    connect: function() {
      console.log("ada yg connect");
    },
    refresh: function() {
      this.loadData();
    },
  },
  methods: {
    loadData() {
      let vm = this;
      axios
        .get(ipBackend + "/temporary/listMakananDanSoto")
        .then((res) => {
          console.log(res.data.data);
          vm.items = res.data.data;
          // this.items.sort(function(a, b){return b.temporaryId - a.temporaryId})
          res.data.data.forEach((element, index) => {
            let x = this.items[index];
            x.pesanan.forEach((element) => {
              if (element.jenis == "soto") {
                element.kode = 1;
              } else if (element.jenis == "makanan") {
                element.kode = 2;
              }
            });
            x.pesanan.sort(function(a, b) {
              return a.kode - b.kode;
            });
          });
          // this.items.sort(function(a, b){return a.nomor - b.nomor})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    done(a) {
      let menu = a;
      let vm = this;
      console.log(menu, "ini menuid");
      console.log(menu.mejaId, "ini mejaid");
      axios
        .post(ipBackend + "/temporary/update/" + menu.temporaryId, {
          status: 1,
          mejaId: menu.mejaId,
        })
        .then((res) => {
          console.log(res);
          vm.$socket.emit("refresh");
          // this.loadData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    doneAll(a) {
      let menu = a;
      console.log(menu.mejaId, "ini meja id");
      axios
        .post(ipBackend + "/temporary/updateMakananPerMeja", {
          status: 1,
          mejaId: menu.mejaId,
        })
        .then((res) => {
          console.log(res);
          this.$socket.emit("refresh");
          // this.loadData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(a, b) {
      let menu = a;
      let vm = this;
      axios
        .post(
          ipBackend + "/temporary/delete/" + menu.temporaryId,
          {
            mejaId: menu.mejaId,
          },
          {
            headers: {
              accesstoken: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          vm.$swal("berhasil");
          vm.items.splice(b, 1);
          this.$socket.emit("refresh");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleClick(a, b) {
      this.$confirm({
        message: `Yakin ingin cancel?`,
        button: {
          no: "Tidak",
          yes: "Ya",
        },
        /**
         * Callback Function
         * @param {Boolean} confirm
         */
        callback: (confirm) => {
          if (confirm) {
            this.deleteItem(a, b);
          }
        },
      });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  font-size: clamp(10px, 23px, 30px);
}
.coret {
  text-decoration: line-through;
}
.abang {
  color: red;
}
.abangcoret {
  text-decoration: line-through;
  color: red;
}
</style>
