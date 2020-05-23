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
				<div v-for="product in this.products" :key="product.id">
					<ProductItem v-bind:product="product" />
				</div>
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
	data() {
		return {
			error: null,
		}
	},
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
	apollo: {
		products: {
			query: require('../graphql/products.gql'),
			error(error) {
				this.onError(error.message)
			},
		},
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
			toCheckout: 'toCheckout',
			onError: 'onError',
		}),
	},
}
</script>

<style>
</style>