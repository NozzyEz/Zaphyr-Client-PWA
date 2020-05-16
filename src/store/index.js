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
		addToBasket: (state, entry) => {
			// Check if the key exist
			if (!state.newOrder[entry[0].id.toString()]) {
				// If it doesn't, add it and set the value to the amount added
				state.newOrder[entry[0].id.toString()] = entry[1]
			} else {
				// if it does, increment the value
				state.newOrder[entry[0].id.toString()] += entry[1]
			}

			state.sumTotal += entry[0].price * entry[1]
			console.log(state.newOrder)
		},
		removeFromBasket: (state, entry) => {
			if (
				// Check if key exists and there's more than 0 in value
				state.newOrder[entry[0].id.toString()] &&
				state.newOrder[entry[0].id.toString()] > 1
			) {
				// then decrement the amount and remove thst multipkied with the price from the total
				state.newOrder[entry[0].id.toString()] -= entry[1]
				state.sumTotal -= entry[0].price * entry[1]
			} else {
				state.newOrder[entry[0].id.toString()] = 0
				// Otherwise delete it from the basket
			}
			console.log(state.newOrder)
		},
		updateAmount: (state, [ id, val ]) => {
			state.newOrder[id] = val
			console.log(state.newOrder)
			// state = { ...state }
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
		// updateAmount ({ state, commit }, [ id, val ]) {
		// 	const payload = [ id, val ]
		// 	commit('updateAmount', payload)
		// this._vm.$set(state.newOrder, this.id, val)
		// },

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
