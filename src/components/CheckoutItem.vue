<template>
	<ApolloQuery :query="require('../graphql/product.gql')" :variables="{ id }">
		<template v-slot="{ result: { loading, error, data } }">
			<div v-if="loading">Loading in data</div>
			<div v-if="error">{{ error }}</div>
			<div v-if="data">
				<ion-item>
					<ion-grid>
						<ion-row>
							<ion-col size="8">
								{{ data.product.name }}
							</ion-col>
							<ion-col>
								{{ amount }}
							</ion-col>
						</ion-row>
						<ion-row>
							<ion-col> {{ data.product.price * amount }} DKK </ion-col>
							<ion-col size="6">
								<ion-button @click="addProduct(data.product)" fill="clear">
									<ion-icon slot="icon-only" name="add-outline" size="large" />
								</ion-button>
								<ion-button @click="removeProduct(data.product)" fill="clear">
									<ion-icon
										slot="icon-only"
										name="remove-circle"
										size="large"
									/>
								</ion-button>
							</ion-col>
						</ion-row>
					</ion-grid>
				</ion-item>
			</div>
		</template>
	</ApolloQuery>
</template>

<script>
import { mapActions } from 'vuex'
import { addIcons } from 'ionicons'
import { addCircle, removeCircle } from 'ionicons/icons'

addIcons({
	'ios-add-outline': addCircle,
	'md-add-outline': addCircle,
	'ios-remove-circle': removeCircle,
	'md-remove-circle': removeCircle,
})

export default {
	name: 'CheckoutItem',
	props: ['product'],
	data() {
		return {
			id: parseInt(this.product[0]),
			amount: this.product[1],
		}
	},
	methods: {
		...mapActions({
			addToBasket: 'addToBasket',
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

<style>
</style>