import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'

// Application Views
import OrderHistory from '../views/OrderHistory.vue'
import SignIn from '../views/SignIn.vue'
import RegisterUser from '../views/RegisterUser.vue'

Vue.use(IonicVueRouter)

const routes = [
	{
		path: '/',
		name: 'OrderHistory',
		component: OrderHistory,
		beforeEnter: (to, from, next) => {
			if (localStorage.authenticationToken) {
				console.log('you have an auth token')
				next()
			} else {
				console.log('Not logged in')
				next({ name: 'SignIn' })
			}
		}
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: SignIn
	},
	{
		path: '/register',
		name: 'RegisterUser',
		component: RegisterUser
	}
]

const router = new IonicVueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
