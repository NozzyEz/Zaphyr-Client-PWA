import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		newOrder: {},
		activeOrder: 0,
		activeProduct: 0,
		priceList: {}
	},
	getters: {
		getAmount: (state) => (id) => {
			return state.newOrder[id]
		},
		getSumTotal (state) {
			let totalSum = 0
			const newOrderHasValue = Object.entries(state.newOrder).length !== 0
			const priceListHasValue = Object.entries(state.priceList).length !== 0
			if (newOrderHasValue && priceListHasValue) {
				Object.keys(state.newOrder).forEach((key) => {
					const amount = state.newOrder[key]
					const price = state.priceList[key]
					totalSum += amount * price
				})
			}
			return totalSum
		}
	},
	mutations: {
		UPDATE_BASKET (state, payload) {
			const productId = payload[0].id
			const productAmount = payload[1]

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
		},
		SET_PRICE_LIST(state, products) {
			state.priceList = products
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
		},
		setPriceList(context, products) {
			let composedPriceList = {}
			products.forEach(product => {
				composedPriceList[product.id] = product.price
			})
			context.commit('SET_PRICE_LIST', composedPriceList)
		}
	},
	modules: {}
})
