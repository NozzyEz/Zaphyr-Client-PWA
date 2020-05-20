<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/" />
				</ion-buttons>
				<ion-title> Bestilling: {{ orderId }} </ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content v-if="orderId">
			<ApolloQuery
				:query="require('../graphql/order.gql')"
				:variables="{ id: orderId }"
			>
				<template v-slot="{ result: { loading, error, data } }">
					<div v-if="loading">Loading in data</div>
					<div v-if="error">{{ error }}</div>
					<div v-if="data">
						<ion-card>
							<ion-card-header>
								<ion-card-subtitle>
									<ion-chip v-if="data.order.paid == true" color="success">
										<ion-label>Betalt</ion-label>
									</ion-chip>
									<ion-chip v-if="data.order.paid == false" color="danger">
										<ion-label>Ikke betalt</ion-label>
									</ion-chip>
									<ion-chip v-if="data.order.paid == null" color="warning">
										<ion-label>Afventer</ion-label>
									</ion-chip>
								</ion-card-subtitle>
								<ion-card-title>
									{{ findDate(data.order.createdAt) }}
								</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<ion-grid>
									<div v-for="product in data.order.products" :key="product.id">
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
									<ion-row>
										<ion-col>Betalt med: {{ data.order.paymentType }}</ion-col>
										<ion-col
											><div class="ion-text-end">
												<strong>
													total: {{ calculateCost(data.order.products) }}
												</strong>
											</div></ion-col
										>
									</ion-row>
								</ion-grid>
							</ion-card-content>
						</ion-card>
					</div>
				</template>
			</ApolloQuery>
		</ion-content>
		<ion-footer> </ion-footer>
	</div>
</template>

<script>
export default {
	name: 'OrderDetail',
	data() {
		return {}
	},
	computed: {
		orderId() {
			return this.$store.state.activeOrder
		},
	},
	methods: {
		findDate(datetime) {
			// console.log(this.order.createdAt)
			const computedDate = new Date(datetime).toDateString()
			// console.log(date)
			return computedDate
		},
		calculateCost(products) {
			console.log(products)
			let cost = 0
			// console.log(this.order.products)
			products.forEach(product => (cost += product.price))
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