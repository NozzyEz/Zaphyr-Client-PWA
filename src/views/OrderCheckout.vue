<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button></ion-back-button>
				</ion-buttons>
				<ion-title>Indkøbskurv</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<div v-for="id in Object.keys(basket)" :key="id">
					<CheckoutItem :id="id" />
				</div>
			</ion-list>
		</ion-content>
		<ion-footer>
			<ion-grid>
				<ion-row>
					<strong>Total: {{ sumTotal }} DKK</strong>
				</ion-row>
				<ion-row>
					<ion-col>
						<ion-button
							@click="finalizeOrder((paymentType = 'MobilePay'))"
							expand="block"
							color="primary"
							>Betal med MobilePay</ion-button
						>
						<ion-button
							@click="finalizeOrder((paymentType = 'Cash'))"
							expand="block"
							color="primary"
							fill="outline"
							>Betal med kontanter</ion-button
						>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-footer>
	</div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import CheckoutItem from '../components/CheckoutItem'
export default {
	name: 'OrderCheckout',
	components: {
		CheckoutItem,
	},
	computed: {
		...mapState({
			basket: 'newOrder',
		}),
		...mapGetters({
			sumTotal: 'getSumTotal',
		}),
	},
	methods: {
		finalizeOrder(paymentType) {
			// TODO Check if basket has content

			// Convert basket to array
			let orderArray = []
			Object.keys(this.basket).forEach(key => {
				let value = this.basket[key]
				for (let i = 0; i < value; i++) {
					orderArray.push(parseInt(key))
				}
			})

			// print final basket and payment type to confirm
			console.log(orderArray)
			console.log(paymentType)

			// TODO Do query and send
			this.sendToBackend(orderArray, paymentType)

			// TODO Route to details page for this order
			delete this.$store.state.newOrder
			this.$router.push({ name: 'Receipt' })
			//! Profit
		},
		sendToBackend(orderArray, paymentType) {
			this.$apollo
				.mutate({
					mutation: require('../graphql/createOrder.gql'), // replace
					variables: {
						productIds: orderArray,
						paymentType: paymentType,
						// variables for the mutation
					},
					update: (cache, { data: { createOrder } }) => {
						try {
							const data = cache.readQuery({
								query: require('../graphql/orders.gql'),
							})
							const insertedOrder = createOrder.order
							data.orders.splice(0, 0, insertedOrder)
							console.log(data.orders)

							cache.writeQuery({
								query: require('../graphql/orders.gql'),
								data,
							})
						} catch (e) {
							console.log(e)
						}
					},
				})
				.then(response => {
					// console.log(response.data)
					// console.log(response.data.createOrder.order.id)
					this.$store.dispatch(
						'updateActiveOrder',
						parseInt(response.data.createOrder.order.id)
					)
				})
				.catch(error => {
					console.log(error)
				})
		},
	},
}
</script>
