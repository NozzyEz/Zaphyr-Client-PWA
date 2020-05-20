<template>
	<ion-card @click="goToDetail">
		<ion-card-header>
			<ion-subtitle>
				{{ date }}
			</ion-subtitle>
		</ion-card-header>
		<ion-card-content>
			<ion-grid>
				<ion-row>
					<ion-col> {{ cost }} DKK </ion-col>
					<ion-col>
						<ion-chip v-if="order.paid == true" color="success">
							<ion-label>Betalt</ion-label>
						</ion-chip>
						<ion-chip v-if="order.paid == false" color="danger">
							<ion-label>Ikke betalt</ion-label>
						</ion-chip>
						<ion-chip v-if="order.paid == null" color="warning">
							<ion-label>Afventer</ion-label>
						</ion-chip>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-card-content>
	</ion-card>
	<!-- {{ cost }}
		{{ order.paid }} -->
</template>

<script>
export default {
	name: 'OrderItem',
	props: ['order'],
	data() {
		return {
			cost: this.calculateCost(),
			date: this.findDate(),
		}
	},
	computed: {
		// funct() {
		// 	return console.log(this.order)
		// },
	},
	methods: {
		goToDetail() {
			this.$store.dispatch('updateActiveOrder', parseInt(this.order.id))
			this.$router.push({ name: 'OrderDetail' })
		},
		findDate() {
			// console.log(this.order.createdAt)

			const date = new Date(this.order.createdAt).toDateString()
			// console.log(date)
			return date
		},
		calculateCost() {
			let cost = 0
			// console.log(this.order.products)
			this.order.products.forEach(product => (cost += product.price))
			return cost
		},
		status() {
			if (this.order.paid) {
				return 'paid'
			}
		},
	},
}
</script>

<style>
</style>