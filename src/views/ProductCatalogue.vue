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
								<ProductItem v-bind:product="product" />
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
						<strong>Total : {{ sumTotal }} DKK</strong>
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
import { mapState, mapActions, mapGetters } from 'vuex'
import ProductItem from '../components/ProductItem'
export default {
	name: 'ProductCatalogue',
	components: {
		ProductItem,
	},
	computed: {
		...mapState({
			basket: 'newOrder',
		}),
		...mapGetters({
			sumTotal: 'getSumTotal',
		}),
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
			toCheckout: 'toCheckout',
		}),
	},
}
</script>

<style>
</style>