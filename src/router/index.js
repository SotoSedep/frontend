import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DashboardAdmin from '../views/login/admin/DashboardAdmin.vue'
import AdminKaryawan from '../views/login/admin/AdminKaryawan.vue'
import AdminMeja from '../views/login/admin/AdminMeja.vue'
import AdminMenu from '../views/login/admin/AdminMenu.vue'
import AdminRekap from '../views/login/admin/AdminRekap.vue'
import DashboardWaitress from '../views/login/waitress/DashboardWaitress.vue'
import MejaWaitress from '../views/login/waitress/MejaWaitress.vue'
import MenuWaitress from '../views/login/waitress/MenuWaitress.vue'
import DashboardKasir from '../views/login/kasir/DashboardKasir.vue'
import DetailKasir from '../views/login/kasir/DetailKasir.vue'
import RekapKasir from '../views/login/kasir/RekapKasir.vue'
import DapurSoto from '../views/login/dapur/Soto.vue'
import DapurMakanan from '../views/login/dapur/Makanan.vue'
import DapurMinuman from '../views/login/dapur/Minuman.vue'
import SotoView from '../views/login/dapur/SotoView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      guest: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      guest: true,
    }
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
    path: '/mejawaitress',
    name: 'mejawaitress',
    component: MejaWaitress,
    
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
              path: '/login',
              query: { redirect: to.fullPath }
          })
      } else {
        if(to.meta.role==localStorage.getItem('role')){
          next()
        }else{
          next({
            path: '/login',
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
