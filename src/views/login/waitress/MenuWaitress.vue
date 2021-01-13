<template>
  <div id="menuwaitress">
      <myheader></myheader>
      <b-container>
            <b-row>
                <b-col md="12" style="margin-top: 60px; margin-bottom: 60px">
                <div class="box">
                    <b-row>
                    <b-col md="12">
                        <h3 class="text-center m-t-0 m-b-0">
                        <strong>Silahkan Pilih Menu</strong>
                        </h3>
                    </b-col>
                    </b-row>
                </div>
                </b-col>    
            </b-row>

            <div class="tabs" style="width:500px; display:flex;">
                    <b-button variant="primary" style="margin:10px;" :class="isActive === 0? 'is-active': ''" @click="isActive = 0">Soto</b-button>
                    <b-button variant="primary" style="margin:10px;" :class="isActive === 1? 'is-active': ''" @click="isActive = 1">Makanan</b-button>
                    <b-button variant="primary" style="margin:10px;" :class="isActive === 2? 'is-active': ''" @click="isActive = 2">Minuman</b-button>
                
            </div>
            
            <div class="content">
                <div class="wrapper">
                    <component :is="menu[isActive]" @kirimCart="tambahkanKecart"></component>
                </div>

                <div class="cart">
                    <table>
                        <tr v-for="(itm, idx) in itemCart" :key="idx">
                            <td>{{itm.namaMenu}}</td>
                            
                        </tr>
                         <tr v-for="(itm, idx) in jumlahh" :key="idx">
                            
                            <td>{{itm.jumlah}}</td>
                        </tr>
                    </table>
                
                <b-button @click="signup()" variant="primary" class="m-t-15">Order</b-button>
                </div>
            </div>    
      </b-container>
  </div>
</template>

<script>
import myheader from "../../../components/Header";
import soto from "../../../components/Soto";
import makanan from "../../../components/Makanan";
import minuman from "../../../components/Minuman";

export default {
    name:'menuwaitress',
    components: {
          myheader,
        },
    data: function () {
        return {
            menu: [
                soto,
                makanan,
                minuman
            ],
            isActive: 0,
            jumlahh:[],
            itemCart:[],
            fields:[
                {
                    key: 'namaMenu',
                    label:'Nama Menu',

                },
                {
                    key: 'harga',
                    label: 'Harga',

                },
                {
                    key: 'jumlah',
                    label: 'Jumlah',

                },
                { key: "actions", label: "Actions" },
            ],
        
        }
        
    },
    methods: {
            tambahkanKecart(e){
                console.log(e)
                this.jumlahh.push(e.jumlah)
                this.itemCart.push(e)     
                    
            }
    }
    
}
</script>

<style scoped>
    #menuwaitress {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
    }
    .tabs {
        display: flex;

        
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .wrapper {
        padding-top: 10px;
    }
    .cart {
        width: 500px;
        
    }
</style>