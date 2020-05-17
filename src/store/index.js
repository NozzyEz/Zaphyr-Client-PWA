import Vue from 'vue'
import Vuex from 'vuex'

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

			state.newOrder[productId] = productAmount
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
		}
	},
	modules: {}
})
