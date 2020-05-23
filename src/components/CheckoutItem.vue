<template>
	<ion-item-sliding>
		<ion-item-options side="end">
			<ion-item-option color="danger" @click="removeFromBasket(product.id)">
				<ion-icon slot="icon-only" name="trash" size="large" />
			</ion-item-option>
		</ion-item-options>
		<ion-item>
			<ion-grid>
				<ion-row>
					<ion-col size="8">
						{{ product.name }}
					</ion-col>
					<ion-col size="4">
						<div class="ion-text-end ion-padding-end">
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
					<ion-col> {{ product.price * amount }} DKK </ion-col>
					<ion-col>
						<div class="ion-text-end">
							<ion-button @click="amount++" fill="clear">
								<ion-icon slot="icon-only" name="add-outline" size="large" />
							</ion-button>
							<ion-button @click="amount > 0 ? amount-- : amount" fill="clear">
								<ion-icon slot="icon-only" name="remove-circle" size="large" />
							</ion-button>
						</div>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-item>
	</ion-item-sliding>
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
		this.getProduct()
	},
}
</script>