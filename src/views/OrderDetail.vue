<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button fill="clear" @click="goBack()" size="large">
						<ion-icon name="arrow-back"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title> Bestilling: {{ orderId }} </ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content v-if="orderId && order !== null">
			<ion-card>
				<ion-card-header>
					<ion-card-subtitle>
						<ion-chip v-if="order.paid == true" color="success">
							<ion-label>Betalt</ion-label>
						</ion-chip>
						<ion-chip v-if="order.paid == false" color="danger">
							<ion-label>Ikke betalt</ion-label>
						</ion-chip>
						<ion-chip v-if="order.paid == null" color="warning">
							<ion-label>Afventer Godkendelse</ion-label>
						</ion-chip>
					</ion-card-subtitle>
					<ion-card-title>
						{{ findDate(order.createdAt) }}
					</ion-card-title>
				</ion-card-header>
				<ion-card-content>
					<ion-grid>
						<ReceiptItem v-bind:order="order" />
						<ion-row>
							<ion-col>Betalt med: {{ order.paymentType }}</ion-col>
							<ion-col
								><div class="ion-text-end">
									<strong>
										total: {{ calculateCost(order.products) }} DKK
									</strong>
								</div></ion-col
							>
						</ion-row>
					</ion-grid>
				</ion-card-content>
			</ion-card>
		</ion-content>
	</div>
</template>

<script>
import ReceiptItem from '../components/ReceiptItem'
import { mapActions } from 'vuex'
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
		return {
			orderId: null,
			order: null,
		}
	},
	computed: {},
	methods: {
		...mapActions({
			onError: 'onError',
		}),
		getOrder(id) {
			this.$apollo
				.query({
					query: require('../graphql/order.gql'),
					variables: {
						id,
					},
				})
				.then(data => {
					this.order = data.data.order
					console.log(data)
				})
				.catch(error => {
					console.log(error)
					this.onError(error)
					this.goBack()
				})
		},
		findDate(datetime) {
			// console.log(this.order.createdAt)
			const computedDate = new Date(datetime).toDateString()
			// console.log(date)
			return computedDate
		},
		calculateCost(products) {
			console.log(products)
			let cost = 0
			console.log(this.order.products)
			products.forEach(product => (cost += product.price))
			return cost
		},
		goBack() {
			this.$router.push({ name: 'OrderHistory' })
		},
	},
	mounted() {
		this.orderId = this.$store.state.activeOrder
		// console.log(this.product)
		this.order = this.getOrder(this.orderId)
	},
}
</script>

<style>
</style>