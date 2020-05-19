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
						<ion-item-option
							color="danger"
							@click="removeFromBasket(data.product.id)"
						>
							<ion-icon slot="icon-only" name="trash" size="large" />
						</ion-item-option>
					</ion-item-options>
					<ion-item>
						<ion-grid>
							<ion-row>
								<ion-col size="8">
									{{ data.product.name }}
								</ion-col>
								<ion-col size="4">
									<div class="ion-text-end ion-padding-end">
										<!-- <input
											ref="amountInput"
											type="number"
											min="0"
											v-model.number="amount"
										/> -->
										<ion-input
											:value="amount"
											@input="amount = $event.target.value"
											min="0"
											type="number"
										/>
									</div>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col> {{ data.product.price * amount }} DKK </ion-col>
								<ion-col>
									<div class="ion-text-end">
										<ion-button @click="amount++" fill="clear">
											<ion-icon
												slot="icon-only"
												name="add-outline"
												size="large"
											/>
										</ion-button>
										<ion-button
											@click="amount > 0 ? amount-- : amount"
											fill="clear"
										>
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
			hidden: false,
		}
	},
	watch: {
		amount() {
			// console.log('Watcher amount fired')
		},
	},
	computed: {
		amount: {
			get() {
				// console.log('Getter Fired', this.$store.state.newOrder[this.id])
				return this.$store.state.newOrder[this.id]
			},
			set(val) {
				val = parseInt(val) || 0
				this.$store.commit('UPDATE_BASKET', [this.product, val])
			},
		},
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
			updateBasket: 'updateBasket',
			removeFromBasket: 'removeFromBasket',
		}),
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
		updateProduct(product, newValue, oldValue) {
			const msg =
				newValue < oldValue
					? `${product.name} er blevet fjernet fra kurven`
					: `${product.name} er blevet tilføjet til kurven`
			const payload = [product, newValue, msg]
			this.updateBasket(payload)
		},
	},
	mounted() {
		// console.log(this.product)
		this.product = this.getProduct()
	},
}
</script>