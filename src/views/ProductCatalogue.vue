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
			<ion-fab vertical="bottom" horizontal="end" slot="fixed">
				<ion-fab-button @click="info">
					<ion-icon name="help"></ion-icon>
				</ion-fab-button>
			</ion-fab>
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
import { addIcons } from 'ionicons'
import { helpCircle } from 'ionicons/icons'

addIcons({
	'ios-help': helpCircle,
	'md-help': helpCircle,
})
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
		info() {
			return this.$ionic.alertController
				.create({
					header: 'Information',
					subHeader: 'Sådan bruges denne menu',
					message:
						'Elementerne på denne skærm kan swipes til venstre for at tilføje til ordre, eller til højre for at få mere information',
					buttons: ['OK'],
				})
				.then(a => a.present())
		},
	},
}
</script>

<style>
</style>