import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'

// Application Views
import OrderHistory from '../views/OrderHistory.vue'
import SignIn from '../views/SignIn.vue'

Vue.use(IonicVueRouter)

const routes = [
	{
		path: '/',
		name: 'OrderHistory',
		component: OrderHistory,
		beforeEnter: (to, from, next) => {
			if (localStorage.authenticationToken) {
				console.log('you have an auth token')
				console.log(typeof localStorage.authenticationToken)
				next()
			} else {
				console.log("you don't have permission")
				next({ name: 'SignIn' })
			}
		}
	},
	{
		path: '/signin',
		name: 'SignIn',
		component: SignIn
	}
]

const router = new IonicVueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
