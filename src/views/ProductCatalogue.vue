<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Product Menu</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-list>
				<ApolloQuery :query="require('../graphql/products.gql')">
					<template v-slot="{ result: { loading, error, data } }">
						<div v-if="loading">Loading in data</div>
						<div v-if="error">{{ error }}</div>
						<div v-if="data">
							<div v-for="product in data.products" :key="product.id">
								<ProductItem
									v-bind:product="product"
									v-on:add-to-basket="addToBasket"
								/>
							</div>
						</div>
					</template>
				</ApolloQuery>
			</ion-list>
		</ion-content>
		<ion-footer>
			<ion-grid>
				<ion-row>
					<ion-col>
						<strong>Total : {{ this.$store.state.sumTotal }} DKK</strong>
					</ion-col>
					<ion-col>
						<ion-button expand="block" @click="toCheckout">
							Bestil og Betal
						</ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-footer>
	</div>
</template>

<script>
import ProductItem from '../components/ProductItem'

export default {
	name: 'ProductCatalogue',
	components: {
		ProductItem,
	},
	data() {
		return {}
	},
	methods: {
		addToBasket(entry) {
			console.log(entry)
			// TODO Rewrite method to use a map instead of an array
			let i

			for (i = 0; i < entry[1]; i++) {
				// Check if the key exist
				if (!this.$store.state.newOrder[entry[0].id.toString()]) {
					// If it doesn't, add it and set the value to one
					this.$store.state.newOrder[entry[0].id.toString()] = 1
				} else {
					// if it does, increment the value
					this.$store.state.newOrder[entry[0].id.toString()] += 1
				}
				this.$store.state.sumTotal += entry[0].price
			}
			console.log(`item ${entry[0].name} was added ${i} times`)
			console.log(this.$store.state.newOrder)
			const msg = `${entry[0].name} er blevet tilføjet til kurven`
			this.showToast(msg)
		},
		toCheckout() {
			if (Object.keys(this.$store.state.newOrder).length !== 0) {
				this.$router.push({ name: 'OrderCheckout' })
			} else {
				const msg = 'Indkøbskurven er tom'
				this.showToast(msg)
			}
		},
		async showToast(msg) {
			const toast = await this.$ionic.toastController.create({
				message: msg,
				position: 'top',
				duration: 2000,
				showCloseButton: true,
			})

			await toast.present()
		},
	},
}
</script>

<style>
</style>