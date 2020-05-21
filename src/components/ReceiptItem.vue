<template>
	<div>
		<div v-for="entry in receipt" :key="entry">
			<ion-row>
				<ion-col>amount</ion-col>
				<ion-col size="8">
					product name for key in receipt
				</ion-col>
				<ion-col>
					product price for key in receipt * amount
				</ion-col>
			</ion-row>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ReceiptItem',
	props: ['order'],
	computed: {
		receipt() {
			let receipt = {}
			// console.log(this.order.products)
			this.order.products.forEach(product => {
				if (receipt[product.id]) {
					receipt[product.id] += 1
				} else {
					receipt[product.id] = 1
				}
			})
			console.log(receipt)
			return receipt
		},
	},
}
</script>