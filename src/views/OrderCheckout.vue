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
						<ion-button
							@click="finalizeOrder((paymentType = 'MobilePay'))"
							expand="block"
							color="primary"
							>Betal med MobilePay</ion-button
						>
						<ion-button
							@click="finalizeOrder((paymentType = 'Cash'))"
							expand="block"
							color="primary"
							fill="outline"
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
	methods: {
		finalizeOrder(paymentType) {
			// Convert basket to array
			let orderArray = []
			Object.keys(this.basket).forEach(key => {
				let value = this.basket[key]
				for (let i = 0; i < value; i++) {
					orderArray.push(parseInt(key))
				}
			})

			// print final basket and payment type to confirm
			console.log(orderArray)
			console.log(paymentType)

			// TODO Create a payload with the correct payment type

			// TODO Do query and send

			// TODO Route to details page for this order
			//! Profit
		},
	},
}
</script>

<style>
</style>