<template>
    <div id="sidebaradmin">
        <div class="title" style="margin-left:40px;">
            Admin
        </div>
        <div class="menu">
            <router-link to="/adminKaryawan" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Data Karyawan
                </div>
            </router-link>
            <router-link to="/adminMenu" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Master Menu
                </div>
            </router-link>
            <router-link to="/adminGrafik" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Grafik Penjualan
                </div>
            </router-link>
            <router-link to="/adminRekap" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Rekap Penjualan
                </div>
            </router-link>
            <router-link to="/pembelian" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Master Barang Pembelian
                </div>
            </router-link>
            <router-link to="/pengeluaran" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Master Data Pengeluaran
                </div>
            </router-link>
            <router-link to="/rekapKaryawanJambu" active-class="active" exact tag="button" class="sidebtnjb">
                <div class="link">
                    Absensi Karyawan Jambu
                </div>
            </router-link>
                        <router-link to="/absenbulan" active-class="active" exact tag="button" class="sidebtnjb">
                <div class="link">
                    Rekap Absen Bulanan Jambu
                </div>
            </router-link>
                        <router-link to="/gajibulan" active-class="active" exact tag="button" class="sidebtnjb">
                <div class="link">
                    Rekap Gaji Bulanan Jambu
                </div>
            </router-link>
            <router-link to="/rekapKaryawanBanyumanik" active-class="active" exact tag="button" class="sidebtnbm">
                <div class="link">
                    Absensi Karyawan Banyumanik
                </div>
            </router-link>

            <router-link to="/absenbulanBanyumanik" active-class="active" exact tag="button" class="sidebtnbm"> 
                <div class="link">
                    Rekap Absen Bulanan Banyumanik
                </div>
            </router-link>
            <!-- <router-link to="/gaji" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Gaji Bulanan
                </div>
            </router-link> -->

            <router-link to="/gajibulanBanyumanik" active-class="active" exact tag="button" class="sidebtnbm">
                <div class="link">
                    Rekap Gaji Bulanan Banyumanik
                </div>
            </router-link>
            
            <router-link to="/pembelianjambu" active-class="active" exact tag="button" class="sidebtnjb">
                <div class="link">
                    Pembelian Jambu
                </div>
            </router-link>
            <router-link to="/pembelianbanyumanik" active-class="active" exact tag="button" class="sidebtnbm">
                <div class="link">
                    Pembelian Banyumanik
                </div>
            </router-link>
            <router-link to="/pembeliangarung" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Pembelian Garung
                </div>
            </router-link>
            <!-- <router-link to="/rekappembelian" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Rekap Pembelian
                </div>
            </router-link> -->
            
            <router-link to="/addsetoran" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Tambah Data Setoran
                </div>
            </router-link>

            <router-link to="/setoran" active-class="active" exact tag="button" class="sidebtn">
                <div class="link">
                    Rekap Setoran
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:'sidebaradmin',
}
</script>

<style scoped>
    #sidebaradmin {
        text-align: left;
        overflow: hidden;
    }
    .title {
        color: white;
        font-size: 30px;
        margin-top: 10px;
    }
    .menu {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        text-align: start;
    }
    .menu > * {
        margin-top: 1px;
    }
    .sidebtn:focus {
        outline: none;
    }
    .sidebtnjb:focus {
        outline: none;
    }
    .sidebtnbm:focus {
        outline: none;
    }
    .sidebtn.active {
        background-color: white;
        color:teal;
        font-weight: 500;
    }
    .sidebtnbm.active {
        background-color: white;
        color:teal;
        font-weight: 500;
    }
    .sidebtnjb.active {
        background-color: white;
        color:teal;
        font-weight: 500;
    }
    .sidebtn {
        border: none;
        padding: 10px 0px;
        background-color: teal;
        cursor: pointer;
        font-size: 16px;
        color: white;
    }
    .sidebtnbm {
        border: none;
        padding: 10px 0px;
        background-color: red;
        cursor: pointer;
        font-size: 16px;
        color: white;
    }
    .sidebtnjb {
        border: none;
        padding: 10px 0px;
        background-color: green;
        cursor: pointer;
        font-size: 16px;
        color: white;
    }
</style>