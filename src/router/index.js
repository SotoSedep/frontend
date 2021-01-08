import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import DashboardAdmin from '../views/login/admin/DashboardAdmin.vue'
import AdminKaryawan from '../views/login/admin/AdminKaryawan.vue'
import AdminMeja from '../views/login/admin/AdminMeja.vue'
import AdminMenu from '../views/login/admin/AdminMenu.vue'
import DashboardWaitress from '../views/login/waitress/DashboardWaitress.vue'
import MenuWaitress from '../views/login/waitress/MenuWaitress.vue'
import DashboardKasir from '../views/login/kasir/DashboardKasir.vue'
import DapurSoto from '../views/login/dapur/Soto.vue'
import DapurMakanan from '../views/login/dapur/Makanan.vue'
import DapurMinuman from '../views/login/dapur/Minuman.vue'


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
    }
  },
  {
    path: '/dashboardadmin',
    name: 'dashboardadmin',
    component: DashboardAdmin,
    meta: {
      requiresAuth: true,
      roles: true,
    }
  },
  {
    path: '/adminkaryawan',
    name: 'adminkaryawan',
    component: AdminKaryawan,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adminmeja',
    name: 'adminmeja',
    component: AdminMeja,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/adminmenu',
    name: 'adminmenu',
    component: AdminMenu,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboardwaitress',
    name: 'dashboardwaitress',
    component: DashboardWaitress,
    meta: {
      requiresAuth: true,
      roles:true,
    }
  },
  {
    path: '/menuwaitress',
    name: 'menuwaitress',
    component: MenuWaitress,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/dashboardkasir',
    name: 'dashboardkasir',
    component: DashboardKasir,
    meta: {
      requiresAuth: true,
      roles:true,
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
]
// import axios from "axios";
// import { ipBackend } from "@/config.js";
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   if(to.matched.some(record => record.meta.requiresAuth)) {
//       if (!localStorage.getItem('token') || localStorage.getItem('token')  == "undefined" || localStorage.getItem('token') == '' ) {
//           next({
//               path: '/login',
//               query: { redirect: to.fullPath }
//           })
//       } else {
//         let dataUser = axios.get(ipBackend + '/karyawan/profile/6', {
//           headers: {
//             'accessToken': localStorage.getItem('token')
//           }
          
//         })
//         if (to.matched.some(record => record.meta.roles)) {
//           if (dataUser.role == 'waitress') {
//             next({
//               path: '/dashboardwaitress',
//               query: { redirect: to.fullPath }
//           })
//           }
//           else if(dataUser.role == 'kasir'){
//             next({
//               path: '/dashboardkasir',
//               query: { redirect: to.fullPath }
//           })
//           }
//           else {
//             next({
//               path: '/login',
//               query: { tujuan: to.fullPath }
//             })
//           }
//         } else {
//           if (dataUser.role == 'admin') {
//             next()
//           }
//           else {
//             next({
//               path: '/login',
//               query: { tujuan: to.fullPath }
//             })
//           }
  
//         }
//       }
//   } else if (to.matched.some(record => record.meta.guest)) {
//     next()
//     } else {
//       next()
//     }  
// })
export default router
