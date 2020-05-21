<template>
	<div>
		<div v-for="(product, index) in order.products" :key="index">
			<ion-row>
				<ion-col>1x</ion-col>
				<ion-col size="8">
					{{ product.name }}
				</ion-col>
				<ion-col>
					{{ product.price }}
				</ion-col>
			</ion-row>
		</div>
		<!-- {{ order }} -->
	</div>
</template>

<script>
export default {
	name: 'ReceiptItem',
	props: ['order'],
	computed: {
		receipt() {
			return console.log('hello world')
		},
	},
}
</script>

<style>
</style>