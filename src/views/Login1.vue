<template>
    <div class="account-wrapper">
        <div>
            <div>
                <div class="account-header">
                    <h3> Soto Sedeep</h3>
                    <small>Awesome Food and Beverages</small>
                </div>

                
                <p v-if=" username!='' "> {{username}}</p>
                <p v-else>...Loading</p>
               <button  @click="gantiUsername()">Gant</button>

               <ul>
                   <li v-for="(item, index) in data" :key="index">
                       {{item.nama}}  {{index}}
                   </li>
               </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import Login from '@/components/Login'
// import Register from '@/components/Register'

export default {
    name: 'Account',
    data() {
        return {
            
           username:'',
           password:''
           , data :[
               {nama: 'adit'},
               {nama: 'adit'},
               {nama: 'adit'},
               {nama: 'adit'}
           ]
    }
    },
    methods: {
        gantiUsername(){
            this.username='asu'
            this.password='hehe'
        }
    },
    beforeCreate(){

    },

    created(){

    }
    
}
</script>
