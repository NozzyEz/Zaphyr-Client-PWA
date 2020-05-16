<template>
	<div>
		<ion-item-sliding>
			<ion-item-options side="start">
				<ion-item-option @click="testMethod(product.id)">
					<ion-icon slot="icon-only" name="info" size="large" />
				</ion-item-option>
			</ion-item-options>
			<ion-item>
				<ion-grid>
					<ion-row>
						<ion-col size="8">
							{{ product.name }}
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col> {{ product.price }} DKK </ion-col>
					</ion-row>
				</ion-grid>
				<br />
			</ion-item>
			<ion-item-options side="end">
				<ion-item-option @click="addToBasket(product)">
					<ion-icon slot="icon-only" name="add-circle" size="large" />
				</ion-item-option>
			</ion-item-options>
		</ion-item-sliding>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { addIcons } from 'ionicons'
import { informationCircle, addCircle, addCircleOutline } from 'ionicons/icons'

addIcons({
	'ios-add-circle': addCircle,
	'md-add-circle': addCircle,
	'ios-add-circle-out': addCircleOutline,
	'md-add-circle-out': addCircleOutline,
	'ios-info': informationCircle,
	'md-info': informationCircle,
})
export default {
	name: 'ProductItem',
	props: ['product'],
	methods: {
		...mapActions({
			showToast: 'showToast',
			updateBasket: 'updateBasket',
		}),
		testMethod(input) {
			console.log(`${input} was pushed`)
		},
		addToBasket(product) {
			let msg = `${product.name} er blevet tilføjet til kurven`
			let payload = [product, 1, msg]
			this.$store.dispatch('updateBasket', payload)
			console.log(this.$store.state.newOrder)
		},
	},
}
</script>

<style>
</style>