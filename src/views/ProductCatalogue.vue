<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Product Catalogue</ion-title>
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
						<strong>Total : {{ total }} DKK</strong>
					</ion-col>
					<ion-col>
						<ion-button expand="block">
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
		return {
			total: 0,
		}
	},
	methods: {
		addToBasket(entry) {
			let i
			for (i = 0; i < entry[1]; i++) {
				sessionStorage.newOrder.push(entry[0])
			}
			console.log(`item ${entry[0]} was added ${i} times`)
		},
	},
}
</script>

<style>
</style>