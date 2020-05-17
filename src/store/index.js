import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		newOrder: {},
		sumTotal: 0
	},
	getters: {
		getAmount: (state) => (id) => {
			return state.newOrder[id]
		}
	},
	mutations: {
		UPDATE_BASKET (state, payload) {
			const productId = payload[0].id.toString()
			// console.log(productId)
			const productAmount = payload[1]
			if (productAmount > 0) {
				state.sumTotal += payload[0].price
			} else {
				state.sumTotal -= payload[0].price
			}
			console.log('UPDATE_BASKET -> productAmount: ', productAmount)

			state.newOrder[productId] = productAmount
			// Trigger reactivity on getter, used in CheckoutItem
			state.newOrder = { ...state.newOrder }
		}
	},
	actions: {
		async showToast (state, msg) {
			const toast = await this._vm.$ionic.toastController.create({
				message: msg,
				position: 'top',
				duration: 2000,
				showCloseButton: true
			})
			await toast.present()
		},

		updateBasket (context, payload) {
			context.commit('UPDATE_BASKET', payload)
			context.dispatch('showToast', payload[2])
		},
		toCheckout (context) {
			if (Object.keys(context.state.newOrder).length !== 0) {
				router.push({ name: 'OrderCheckout' })
			} else {
				const msg = 'Indkøbskurven er tom'

				context.dispatch('showToast', msg)
			}
		}
	},
	modules: {}
})
