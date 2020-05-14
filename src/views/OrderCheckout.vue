<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Indkøbskurv</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<div v-for="id in Object.keys(basket)" :key="id">
					<CheckoutItem :id="id" />
				</div>
			</ion-list>
		</ion-content>
		<ion-footer>
			<ion-grid>
				<ion-row>
					<strong>Total: {{ total }} DKK</strong>
				</ion-row>
				<ion-row>
					<ion-col>
						<ion-button expand="block" color="primary"
							>Betal med MobilePay</ion-button
						>
						<ion-button expand="block" color="primary" fill="outline"
							>Betal med kontanter</ion-button
						>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-footer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import CheckoutItem from '../components/CheckoutItem'
export default {
	name: 'OrderCheckout',
	components: {
		CheckoutItem,
	},
	computed: {
		...mapState({
			basket: 'newOrder',
			total: 'sumTotal',
		}),
	},
}
</script>

<style>
</style>