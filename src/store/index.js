import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		newOrder: {},
		sumTotal: 0
	},
	mutations: {
		addToBasket: (state, entry) => {
			let i

			for (i = 0; i < entry[1]; i++) {
				// Check if the key exist
				if (!state.newOrder[entry[0].id.toString()]) {
					// If it doesn't, add it and set the value to one
					state.newOrder[entry[0].id.toString()] = 1
				} else {
					// if it does, increment the value
					state.newOrder[entry[0].id.toString()] += 1
				}
				state.sumTotal += entry[0].price
			}
			console.log(state.newOrder)
		},
		removeFromBasket: (state, entry) => {
			let i

			for (i = 0; i < entry[1]; i++) {
				// Check if the key exist
				if (
					state.newOrder[entry[0].id.toString()] &&
					state.newOrder[entry[0].id.toString()] > 0
				) {
					state.newOrder[entry[0].id.toString()] -= 1
					state.sumTotal -= entry[0].price
				}
			}
			console.log(state.newOrder)
		}
	},
	actions: {
		addToBasket ({ dispatch, commit }, payload) {
			commit('addToBasket', payload)
			dispatch('showToast', payload[2])
		},

		removeFromBasket ({ dispatch, commit }, payload) {
			commit('removeFromBasket', payload)
			dispatch('showToast', payload[2])
		},

		async showToast (state, msg) {
			const toast = await this._vm.$ionic.toastController.create({
				message: msg,
				position: 'top',
				duration: 2000,
				showCloseButton: true
			})

			await toast.present()
		}
	},
	modules: {}
})
