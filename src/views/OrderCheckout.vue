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
			<!-- <div v-for="item in uniqueItems" :key="item"> -->
			<CheckoutItem />
			<!-- </div> -->

			content goes here
		</ion-content>
		<ion-footer>
			<div class="ion-padding">
				<ion-button expand="block" color="primary"
					>Betal med MobilePay</ion-button
				>
				<ion-button expand="block" color="primary" fill="outline"
					>Betal med kontanter</ion-button
				>
			</div>
		</ion-footer>
	</div>
</template>

<script>
import CheckoutItem from '../components/CheckoutItem'
export default {
	name: 'OrderCheckout',
	components: {
		CheckoutItem,
	},
	data() {
		return {}
	},
	created() {},
}
</script>

<style>
</style>