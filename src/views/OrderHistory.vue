<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Ordrehistorik</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="$router.push({ name: 'About' })">
						<ion-icon slot="icon-only" name="info" size="large" />
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding ion-text-center">
			<ion-grid>
				<ion-item>
					<ion-col></ion-col>
					<ion-col size="8">
						<div class="ion-text-end">
							{{ `Focus nummer: ${user.username}` }}
							<br />
							{{ `Navn: ${user.name}` }}
						</div>
					</ion-col>
				</ion-item>
			</ion-grid>
			<div v-for="order in this.orders" :key="order.id">
				<OrderItem v-bind:order="order" />
			</div>
		</ion-content>
		<ion-footer>
			<div class="ion-padding">
				<ion-button @click="newOrder" expand="block" color="primary"
					>Ny Bestilling</ion-button
				>
				<ion-button
					@click="$router.push({ name: 'UpdateProfile' })"
					expand="block"
					color="primary"
					fill="outline"
					>Opdater Profil</ion-button
				>
				<ion-button @click="logOut" expand="block" color="danger"
					>Log ud</ion-button
				>
			</div>
		</ion-footer>
	</div>
</template>

<script>
import OrderItem from '../components/OrderItem'
import { mapActions } from 'vuex'
import { addIcons } from 'ionicons'
import { informationCircle } from 'ionicons/icons'

addIcons({
	'ios-info': informationCircle,
	'md-info': informationCircle,
})
export default {
	name: 'OrderHistory',
	data() {
		return {
			user: {
				username: localStorage.username.toString(),
				name: localStorage.firstName + ' ' + localStorage.lastName,
				authToken: localStorage.authenticationToken,
				email: localStorage.email,
				error: null,
			},
		}
	},
	components: {
		OrderItem,
	},
	apollo: {
		orders: {
			query: require('../graphql/orders.gql'),
			error(error) {
				this.onError(error.message)
			},
		},
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
			setPriceList: 'setPriceList',
			onError: 'onError',
			clearUser: 'clearUser',
		}),
		newOrder() {
			this.$router.push({ name: 'ProductCatalogue' })
		},
		logOut() {
			this.clearUser()
			this.$router.push({ name: 'SignIn' })
			this.showToast('Du er nu logget ud')
		},
		priceListToStore() {
			this.$apollo
				.query({
					query: require('../graphql/products.gql'),
				})
				.then(response => {
					this.setPriceList(response.data.products)
				})
		},
	},
	mounted() {
		this.priceListToStore()
	},
}
</script>