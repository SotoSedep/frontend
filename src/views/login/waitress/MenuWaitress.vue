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
                    <h3 style="text-align:center; padding-left: 100px">Order</h3>
            </div>
            
            <div class="content">
                <div class="wrapper">
                    <component :is="menu[isActive]"></component>
                </div>

                <div class="cart">
                    <b-table
                    show-empty
                    bordered
                    hover
                    ref="table"
                    :items="items"
                    :fields="fields"
                    @filtered="onFiltered"
                    responsive
                    style="width:500px;"
                    >
                <template v-slot:cell(actions)="">
                    <b-input-group>
                        <b-input-group-prepend>
                        <b-btn variant="outline-info" @click="num--">-</b-btn>
                        </b-input-group-prepend>

                        <b-form-input style="width:10px;" type="number" min="0.00" v-model="num"></b-form-input>

                        <b-input-group-append>
                        <b-btn variant="outline-secondary" @click="num++">+</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                    <!-- <b-button
                    size="sm"
                    variant="success"
                    @click="infoQs(row.item, row.index, $event.target)"
                    class="mr-1"
                    >
                    <b-icon icon="patch-plus" aria-hidden="true"></b-icon>
                    </b-button>
                    <b-button
                    size="sm"
                    variant="success"
                    @click="deleteQs(row.item.id)"
                    class="mr-1"
                    >
                    <b-icon icon="patch-minus" aria-hidden="true"></b-icon>
                    </b-button> -->
                </template>
                
                </b-table>
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
    data() {
        return {
            menu: [
                soto,
                makanan,
                minuman
            ],
            isActive: 0,
            num:0,
            items:[
                { nomor: '1', nama_menu: 'Soto Ayam', harga: 12000},
                { nomor: '2', nama_menu: 'Nasi Goreng', harga: 13000},
                { nomor: '3', nama_menu: 'Es Teh', harga: 15000},
                { nomor: '4', nama_menu: 'Es Jeruk', harga: 16000},
            ],
            fields:[
                {
                key: "nomor",
                label: "No",
                sortable: true,
                sortDirection: "desc",
                },
                {
                    key: 'nama_menu',
                    label:'Nama Menu',
                    sortable: true
                },
                {
                    key: 'harga',
                    label: 'Harga',
                    sortable: true,
                },
                { key: "actions", label: "Actions" },
            ],

        }
        
    },
    methods: {
        updateItemQty(index, item, flag) {
            if(flag === 0 && Number(item.qty) > 1) {
                item.qty = Number(item.qty) - 1
            }else{
                item.qty = Number(item.qty) + 1
            }

            this.cart[index] = item
            localStorage.setItem('cart', JSON.stringify(this.cart))

            this.$alertify.success('Cart successfully updated');
        },
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