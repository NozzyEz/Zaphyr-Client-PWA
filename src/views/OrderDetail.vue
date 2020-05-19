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
						{{ data.order }}
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
		return {
			// orderId: this.$store.state.activeOrder,
		}
	},
	computed: {
		orderId() {
			return this.$store.state.activeOrder
		},
	},
	methods: {},
}
</script>

<style>
</style>