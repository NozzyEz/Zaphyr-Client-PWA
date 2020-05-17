<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button />
				</ion-buttons>
				<ion-title>
					Produkt Detaljer
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ApolloQuery
				:query="require('../graphql/product.gql')"
				:variables="{ id: pid }"
			>
				<template v-slot="{ result: { loading, error, data } }">
					<div v-if="loading">Loading in data</div>
					<div v-if="error">{{ error }}</div>
					<div v-if="data">
						{{ data.product.id }}
						{{ data.product.name }}
						{{ data.product.description }}
						{{ data.product.price }}
					</div>
				</template>
			</ApolloQuery>
		</ion-content>
		<ion-footer>
			<ion-grid>
				<ion-row>
					<ion-col>
						<strong>Total : {{ total }} DKK</strong>
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
import { mapActions } from 'vuex'

export default {
	name: 'ProductDetail',
	props: ['product'],
	data() {
		return {
			pid: parseInt(this.$store.state.activeProduct),
			total: this.$store.state.sumTotal,
		}
	},
	methods: {
		...mapActions({
			toCheckout: 'toCheckout',
		}),
	},
}
</script>

<style>
</style>