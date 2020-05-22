<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button fill="clear" @click="goBack()" size="large">
						<ion-icon name="arrow-back"></ion-icon>
					</ion-button>
					<!-- <ion-back-button defaultHref="OrderHistory"></ion-back-button> -->
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
									<ReceiptItem v-bind:order="data.order" />
									<ion-row>
										<ion-col>Betalt med: {{ data.order.paymentType }}</ion-col>
										<ion-col
											><div class="ion-text-end">
												<strong>
													total: {{ calculateCost(data.order.products) }} DKK
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
import ReceiptItem from '../components/ReceiptItem'
import { addIcons } from 'ionicons'
import { chevronDown } from 'ionicons/icons'

addIcons({
	'ios-arrow-back': chevronDown,
	'md-arrow-back': chevronDown,
})
export default {
	name: 'OrderDetail',
	components: {
		ReceiptItem,
	},
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
			// console.log(products)
			let cost = 0
			// console.log(this.order.products)
			products.forEach(product => (cost += product.price))
			return cost
		},
		goBack() {
			this.$router.push({ name: 'OrderHistory' })
		},
	},
}
</script>

<style>
</style>