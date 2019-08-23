import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login/login.vue'
import Register from '@/views/register/register.vue'
import Main from '@/views/main/main.vue'
import Home from '@/views/home/home.vue'
import Rent from '@/components/Rent.vue'
import Order from '@/components/Order.vue'
import OrderHistory from '@/components/OrderHistory.vue'
import Ticket from '@/components/Ticket.vue'
import TicketHistory from '@/components/TicketHistory.vue'
import Profile from '@/components/Profile.vue'
import VueResource from 'vue-resource'

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/rent',
          name: 'Rent',
          component: Rent
        },
        {
          path: '/order',
          name: 'Order',
          component: Order
        },
        {
          path: '/orderhistory',
          name: 'OrderHistory',
          component: OrderHistory
        },
        {
          path: '/ticket',
          name: 'Ticket',
          component: Ticket
        },
        {
          path: '/tickethistory',
          name: 'TicketHistory',
          component: TicketHistory
        },
        {
          path: '/profile',
          name: 'Profile',
          component: Profile
        }
      ]
    }
  ]
})
