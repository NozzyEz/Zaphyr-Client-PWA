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
						<ion-col size="8" @click="testMethod(product.id)">
							{{ product.name }}
						</ion-col>
						<ion-col push="2">
							<ion-button fill="clear" @click="addToBasket(product.id)">
								<ion-icon
									slot="icon-only"
									name="add-circle"
									size="large"
									color="dark"
								/>
							</ion-button>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col @click="testMethod(product.id)">
							{{ product.price }} DKK
						</ion-col>
					</ion-row>
				</ion-grid>
				<br />
			</ion-item>
			<ion-item-options side="end">
				<ion-item-option @click="addToBasket(product.id)">
					<ion-icon slot="icon-only" name="add-circle" size="large" />
				</ion-item-option>
			</ion-item-options>
		</ion-item-sliding>
	</div>
</template>

<script>
import { addIcons } from 'ionicons'
import { addCircleOutline, informationCircle } from 'ionicons/icons'

addIcons({
	'ios-add-circle': addCircleOutline.ios,
	'md-add-circle': addCircleOutline.md,
	'ios-info': informationCircle.ios,
	'md-info': informationCircle.md,
})
export default {
	name: 'ProductItem',
	props: ['product'],
	methods: {
		testMethod(input) {
			console.log(`${input} was pushed`)
		},
		addToBasket(id) {
			// TODO Move this to ProductCatalogue.vue and emit from here instead
			console.log(`product ${id} has been added to basket`)
		},
	},
}
</script>

<style>
ion-icon {
	color: #fff;
}
</style>