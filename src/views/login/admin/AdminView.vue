<template>
    <div id="adminview">
        <div  class="sidebar">
                <sidebaradmin/>
        </div>
        
        
        <div class="content">
            <headersuper/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import sidebaradmin from "../../../components/SidebarAdmin"
import headersuper from "../../../components/NewHeader"


export default {
    name: 'adminview',
    components: {
        sidebaradmin,
        headersuper
        
    },
    data(){
        return {
            
        }
    }
}
</script>

<style scoped>
    #adminview {
        display: flex; 
        width: 100vw;      
    }
    .sidebar{
        height: 100%;
        width: 160px;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: teal;
        overflow-x: hidden;
        padding-top: 20px;
    }
    .content {
        background-color: white;
        margin-left: 160px;
        width: 100vw;
    }
</style>