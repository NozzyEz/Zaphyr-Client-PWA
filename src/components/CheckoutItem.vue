<template>
	<ApolloQuery
		:query="require('../graphql/product.gql')"
		:variables="{ id: pid }"
	>
		<template v-slot="{ result: { loading, error, data } }">
			<div v-if="loading">Loading in data</div>
			<div v-if="error">{{ error }}</div>
			<div v-if="data">
				<ion-item-sliding>
					<ion-item-options side="end">
						<ion-item-option color="danger" @click="getProduct">
							<ion-icon slot="icon-only" name="trash" size="large" />
						</ion-item-option>
					</ion-item-options>
					<ion-item>
						<ion-grid>
							<ion-row>
								<ion-col size="8">
									{{ data.product.name }}
								</ion-col>
								<ion-col>
									<div class="ion-text-end ion-padding-end">
										<ion-input
											:value="amount"
											:min="0"
											:max="99"
											@input="amount = parseInt($event.target.value) || 0"
											type="number"
										></ion-input>
									</div>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col> {{ data.product.price * amount }} DKK </ion-col>
								<ion-col>
									<div class="ion-text-end">
										<ion-button @click="amount += 1" fill="clear">
											<ion-icon
												slot="icon-only"
												name="add-outline"
												size="large"
											/>
										</ion-button>
										<ion-button @click="amount -= 1" fill="clear">
											<ion-icon
												slot="icon-only"
												name="remove-circle"
												size="large"
											/>
										</ion-button>
									</div>
								</ion-col>
							</ion-row>
						</ion-grid>
					</ion-item>
				</ion-item-sliding>
			</div>
		</template>
	</ApolloQuery>
</template>

<script>
import { mapActions } from 'vuex'
import { addIcons } from 'ionicons'
import { addCircle, removeCircle, trash } from 'ionicons/icons'

addIcons({
	'ios-add-outline': addCircle,
	'md-add-outline': addCircle,
	'ios-remove-circle': removeCircle,
	'md-remove-circle': removeCircle,
	'ios-trash': trash,
	'md-trash': trash,
})

export default {
	name: 'CheckoutItem',
	props: ['id'],
	data() {
		return {
			pid: parseInt(this.id),
			product: {},
			amount: this.$store.getters.getAmount(this.id),
		}
	},
	watch: {
		amount(newValue, oldValue) {
			newValue = parseInt(newValue) || 0
			newValue = newValue < 0 ? 0 : newValue

			let diff = newValue - oldValue
			// console.log(diff)
			if (diff > 0) {
				let i = 0
				for (i; i < diff; i++) {
					this.addProduct(this.product, 1)
				}
			} else {
				let i = 0
				for (i; i < -diff; i++) {
					this.removeProduct(this.product, 1)
				}
			}
			this.$store.commit('updateAmount', [this.id, newValue])
		},
	},
	computed: {},
	methods: {
		...mapActions({
			addToBasket: 'addToBasket',
			removeFromBasket: 'removeFromBasket',
			showToast: 'showToast',
		}),
		addProduct(product, amount) {
			let msg = `${product.name} er blevet tilføjet til kurven`
			let payload = [product, amount, msg]
			this.addToBasket(payload)
			amount += 1
		},
		removeProduct(product, amount) {
			let msg = `${product.name} er blevet fjernet fra kurven`
			let payload = [product, amount, msg]
			this.removeFromBasket(payload)
			amount -= 1
		},
		// deleteFromOrder(id) {},
		getProduct() {
			this.$apollo
				.query({
					query: require('../graphql/product.gql'),
					variables: {
						id: this.pid,
					},
				})
				.then(data => {
					this.product = data.data.product
				})
		},
		// updateAmount(val) {
		// 	let amount = isNaN(parseInt(val)) ? 0 : parseInt(val)
		// 	this.$store.commit('updateAmount', [this.id, amount])
		// },
	},
	created() {
		this.product = this.getProduct()
	},
}
</script>

