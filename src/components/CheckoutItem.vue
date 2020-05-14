<template>
	<ApolloQuery :query="require('../graphql/product.gql')" :variables="{ id }">
		<template v-slot="{ result: { loading, error, data } }">
			<div v-if="loading">Loading in data</div>
			<div v-if="error">{{ error }}</div>
			<div v-if="data">
				<ion-item-sliding>
					<ion-item-options side="end">
						<ion-item-option
							color="danger"
							@click="showToast('testing trashcan')"
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
								<ion-col>
									<div class="ion-text-end ion-padding-end">
										<ion-input
											@input="amount = $event.target.value"
											:value="amount"
											type="number"
										></ion-input>
									</div>
								</ion-col>
							</ion-row>
							<ion-row>
								<ion-col> {{ data.product.price * amount }} DKK </ion-col>
								<ion-col>
									<div class="ion-text-end">
										<ion-button @click="addProduct(data.product)" fill="clear">
											<ion-icon
												slot="icon-only"
												name="add-outline"
												size="large"
											/>
										</ion-button>
										<ion-button
											@click="removeProduct(data.product)"
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
import { mapActions, mapState } from 'vuex'
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
	props: ['product'],
	data() {
		return {
			id: parseInt(this.product[0]),
			amount: this.product[1],
			// amount: this.basket[this.product[0]],
		}
	},
	computed: mapState({
		basket: 'newOrder',
	}),
	methods: {
		...mapActions({
			addToBasket: 'addToBasket',
			showToast: 'showToast',
		}),
		addProduct(product) {
			let msg = `${product.name} er blevet tilføjet til kurven`
			let payload = [product, 1, msg]
			this.$store.dispatch('addToBasket', payload)
			this.amount += 1
		},
		removeProduct(product) {
			let msg = `${product.name} er blevet fjernet fra kurven`
			let payload = [product, 1, msg]
			this.$store.dispatch('removeFromBasket', payload)
			if (this.amount !== 0) this.amount -= 1
		},
	},
}
</script>

<style scoped>
ion-button > div {
	width: 100%;
}
</style>