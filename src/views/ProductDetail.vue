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
		<ion-content> </ion-content>
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
			total: this.$store.state.sumTotal,
		}
	},
	methods: {
		...mapActions({
			toCheckout: 'toCheckout',
		}),
	},
	mounted: {},
}
</script>

<style>
</style>