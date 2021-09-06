import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DashboardAdmin from '../views/login/admin/DashboardAdmin.vue'
import AdminKaryawan from '../views/login/admin/AdminKaryawan.vue'
import AdminMeja from '../views/login/admin/AdminMeja.vue'
import AdminView from '../views/login/admin/AdminView.vue'
import AdminMenu from '../views/login/admin/AdminMenu.vue'
import AdminRekap from '../views/login/admin/AdminRekap.vue'
import AdminRekapShift from '../views/login/admin/AdminRekapShift.vue'
import AdminGrafik from '../views/login/admin/AdminGrafik.vue'
import DashboardWaitress from '../views/login/waitress/DashboardWaitress.vue'
import MenuWaitress from '../views/login/waitress/MenuWaitress.vue'
import DashboardKasir from '../views/login/kasir/DashboardKasir.vue'
import DetailKasir from '../views/login/kasir/DetailKasir.vue'
import RekapKasir from '../views/login/kasir/RekapKasir.vue'
import DapurSoto from '../views/login/dapur/Soto.vue'
import DapurMakanan from '../views/login/dapur/Makanan.vue'
import DapurMinuman from '../views/login/dapur/DapurMinuman.vue'
import SotoView from '../views/login/dapur/DapurMakananView.vue'
import MakananView from '../views/login/dapur/MakananView.vue'
import MinumanView from '../views/login/dapur/DapurMinumanView.vue'
import Dapur from '../views/login/dapur/DapurMakanan.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    }
  },
  {
    path: '/adminview',
    name: 'adminview',
    component: AdminView,
    children: [
      {
        path: '/adminKaryawan',
        name: 'adminKaryawan',
        component: () => import(/* webpackChunkName: "MasterBarangAdmin" */ '../views/login/admin/AdminKaryawan')
      },
      {
        path: '/adminMenu',
        name: 'adminMenu',
        component: () => import(/* webpackChunkName: "adminmenu" */ '../views/login/admin/AdminMenu')
      },
      {
        path: '/adminGrafik',
        name: 'adminGrafik',
        component: () => import(/* webpackChunkName: "admingrafik" */ '../views/login/admin/AdminGrafik')
      },
      {
        path: '/adminRekap',
        name: 'adminRekap',
        component: () => import(/* webpackChunkName: "admingrafik" */ '../views/login/admin/AdminRekap')
      },
      {
        path: '/rekapKaryawan',
        name: 'rekapKaryawan',
        component: () => import(/* webpackChunkName: "rekapkaryawan" */ '../views/login/admin/RekapKaryawan')
      },
      {
        path: '/rekapPembelian',
        name: 'rekapPembelian',
        component: () => import(/* webpackChunkName: "rekappembelian" */ '../views/login/admin/RekapPembelian')
      },
      {
        path: '/pembelian',
        name: 'pembelian',
        component: () => import(/* webpackChunkName: "pembelian" */ '../views/login/admin/Pembelian')
      },
      {
        path: '/setoran',
        name: 'setoran',
        component: () => import(/* webpackChunkName: "MasterWilayah" */ '../views/login/admin/RekapSetoran')
      },
      {
        path: '/absenbulan',
        name: 'absenbulan',
        component: () => import(/* webpackChunkName: "MasterWilayah" */ '../views/login/admin/AbsenBulan')
      },
      {
        path: '/gajibulan',
        name: 'gajibulan',
        component: () => import(/* webpackChunkName: "MasterWilayah" */ '../views/login/admin/RekapGajiBulanan')
      },
      {
        path: '/gaji',
        name: 'gaji',
        component: () => import(/* webpackChunkName: "MasterWilayah" */ '../views/login/admin/GajiKaryawan')
      },
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/dashboardadmin',
    name: 'dashboardadmin',
    component: DashboardAdmin,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/adminkaryawan',
    name: 'adminkaryawan',
    component: AdminKaryawan,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/adminmeja',
    name: 'adminmeja',
    component: AdminMeja,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/adminmenu',
    name: 'adminmenu',
    component: AdminMenu,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/adminrekap',
    name: 'adminrekap',
    component: AdminRekap,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/adminshift',
    name: 'adminshift',
    component: AdminRekapShift,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/dashboardwaitress',
    name: 'dashboardwaitress',
    component: DashboardWaitress,
    meta: {
      requiresAuth: true,
      role: 'waitress'
    }
  },
  {
    path: '/menuwaitress',
    name: 'menuwaitress',
    component: MenuWaitress,
    meta: {
      requiresAuth: true,
      role: 'waitress'
    }
  },
  {
    path: '/admingrafiks',
    name: 'admingrafik',
    component: AdminGrafik,
    meta: {
      requiresAuth: true,
      role : 'admin'
    }
  },
  {
    path: '/dashboardkasir',
    name: 'dashboardkasir',
    component: DashboardKasir,
    meta: {
      requiresAuth: true,
      role: 'kasir'
    }
  },
  {
    path: '/detailkasir',
    name: 'detailkasir',
    component: DetailKasir,
    meta: {
      requiresAuth: true,
      role: 'kasir'
    }
  },
  {
    path: '/rekapkasir',
    name: 'rekapkasir',
    component: RekapKasir,
    meta: {
      requiresAuth: true,
      role : 'kasir'
    }
  },
  {
    path: '/dapursoto',
    name: 'dapursoto',
    component: DapurSoto,
    meta: {
      guest: true,
    }
  },
  {
    path: '/dapurmakanan',
    name: 'dapurmakanan',
    component: DapurMakanan,
    meta: {
      guest: true,
    }
  },
  {
    path: '/dapurminuman',
    name: 'dapurminuman',
    component: DapurMinuman,
    meta: {
      guest: true,
    }
  },
  {
    path: '/sotoview',
    name: 'sotoview',
    component: SotoView,
    meta: {
      guest: true,
    }
  },
  {
    path: '/makananview',
    name: 'makananview',
    component: MakananView,
    meta: {
      guest: true,
    }
  },
  {
    path: '/dapur',
    name: 'dapur',
    component: Dapur,
    meta: {
      guest: true,
    }
  },
  {
    path: '/minumanview',
    name: 'minumanview',
    component: MinumanView,
    meta: {
      guest: true,
    }
  },
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})


router.beforeEach(async (to, from, next) => {

  if(to.matched.some(record => record.meta.requiresAuth)) {
    // console.log(localStorage.getItem('token'))
    console.log( to.meta.role, 'aaa')
      if (!localStorage.getItem('token') || localStorage.getItem('token')  == "undefined" || localStorage.getItem('token') == '' ) {
          next({
              path: '/',
              query: { redirect: to.fullPath }
          })
      } else {
        if(to.meta.role==localStorage.getItem('role')){
          next()
        }else{
          next({
            path: '/',
            query: { redirect: to.fullPath }
        })
        }
     
       
       
      }
  } else if (to.matched.some(record => record.meta.guest)) {
    next()
    } else {
      next()
    }  
})
export default router
