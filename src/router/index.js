import Vue from 'vue'
import { IonicVueRouter } from '@ionic/vue'

// Application Views
import OrderHistory from '../views/OrderHistory.vue'
import OrderCheckout from '../views/OrderCheckout.vue'
import OrderDetail from '../views/OrderDetail.vue'
import ProductCatalogue from '../views/ProductCatalogue.vue'
import ProductDetail from '../views/ProductDetail.vue'
import SignIn from '../views/SignIn.vue'
import RegisterUser from '../views/RegisterUser.vue'
import UpdateProfile from '../views/UpdateProfile.vue'
import About from '../views/About.vue'

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
		path: '/about',
		name: 'About',
		component: About
	},
	{
		path: '/order',
		name: 'OrderDetail',
		component: OrderDetail
	},
	{
		path: '/products',
		name: 'ProductCatalogue',
		component: ProductCatalogue
	},
	{
		path: '/product',
		name: 'ProductDetail',
		component: ProductDetail
	},
	{
		path: '/profile',
		name: 'UpdateProfile',
		component: UpdateProfile
	},
	{
		path: '/chekout',
		name: 'OrderCheckout',
		component: OrderCheckout
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
