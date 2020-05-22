<template>
	<div>
		<div v-for="(amount, id) in receipt" :key="id">
			<ion-row>
				<ion-col size="2">{{ amount }}x</ion-col>
				<ion-col size="6">
					{{ order.products.find(p => p.id == id).name }}
				</ion-col>
				<ion-col size="4" class="ion-text-end">
					{{ order.products.find(p => p.id == id).price * amount }}
					DKK
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
			console.log(this.order)
			return receipt
		},
	},
}
</script>