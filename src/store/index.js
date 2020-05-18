import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		newOrder: {},
		activeOrder: 0,
		sumTotal: 0,
		activeProduct: 0,
		productList: {}
	},
	getters: {
		getAmount: (state) => (id) => {
			return state.newOrder[id]
		},
		getSumTotal (state) {
			let totalSum = 0
			const newOrderHasValue = Object.entries(state.newOrder).length !== 0
			const productListHasValue = Object.entries(state.productList).length !== 0
			if (newOrderHasValue && productListHasValue) {
				Object.keys(state.newOrder).forEach((key) => {
					const amount = state.newOrder[key]
					const price = state.productList[key].price
					console.log('Amount', amount)
					console.log('Price', state.productList[key])
					totalSum += amount * price
				})
			}
			return totalSum
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
				//! Prevent this from going negative
				state.sumTotal -= payload[0].price
			}
			// console.log('UPDATE_BASKET -> productAmount: ', productAmount)

			state.newOrder[productId] = productAmount
			// Trigger reactivity on getter, used in CheckoutItem
			state.newOrder = { ...state.newOrder }
		},
		updateActiveProduct (state, id) {
			state.activeProduct = id
		},
		updateCheckedOutOrder (state, id) {
			state.activeOrder = id
			console.log(`order with id: ${state.activeOrder} has been checked out`)
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
		},
		updateActiveProduct (context, id) {
			context.commit('updateActiveProduct', id)
		},
		updateCheckedOutOrder (context, id) {
			context.commit('updateCheckedOutOrder', id)
		}
	},
	modules: {}
})
