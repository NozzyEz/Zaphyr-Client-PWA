<template>
	<ion-item>
		<ion-grid>
			<ion-row>
				<ion-col size="8" @click="testMethod(product.id)">{{
					product.name
				}}</ion-col>
				<ion-col push="2">
					<ion-button fill="clear">
						<ion-icon
							slot="icon-only"
							name="add-circle"
							size="large"
							color="dark"
						></ion-icon>
					</ion-button>
				</ion-col>
			</ion-row>
			<ion-row>
				<ion-col @click="testMethod(product.id)"
					>{{ product.price }} DKK</ion-col
				>
			</ion-row>
			<!-- <ion-row>
				<ion-col>
					{{ product.description }}
				</ion-col>
			</ion-row> -->
		</ion-grid>
		<br />
	</ion-item>
</template>

<script>
import { addIcons } from 'ionicons'
import { addCircleOutline } from 'ionicons/icons'

addIcons({
	'ios-add-circle': addCircleOutline.ios,
	'md-add-circle': addCircleOutline.md,
})
export default {
	name: 'ProductItem',
	props: ['product'],
	methods: {
		testMethod(input) {
			console.log(`${input} was pushed`)
		},
	},
}
</script>

<style>
ion-icon {
	color: #fff;
}
</style>