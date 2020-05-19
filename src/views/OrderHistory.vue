<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Order History</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding ion-text-center">
			<ion-grid>
				<ion-item>
					<ion-col></ion-col>
					<ion-col size="8">
						<div>
							<ion-row>
								{{ `Focus nummer: ${user.username}` }}
							</ion-row>
							<ion-row>
								{{ `Navn: ${user.name}` }}
							</ion-row>
						</div>
					</ion-col>
				</ion-item>
			</ion-grid>

			<ApolloQuery :query="require('../graphql/orders.gql')">
				<template v-slot="{ result: { loading, error, data } }">
					<div v-if="loading">Loading in data</div>
					<div v-if="error">{{ error }}</div>
					<div v-if="data">
						<div v-for="order in data.orders" :key="order.id">
							<OrderItem v-bind:order="order" />
						</div>
					</div>
				</template>
			</ApolloQuery>
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
export default {
	name: 'OrderHistory',
	data() {
		return {
			user: {
				username: localStorage.username.toString(),
				name: localStorage.firstName + ' ' + localStorage.lastName,
				authToken: localStorage.authenticationToken,
				email: localStorage.email,
			},
		}
	},
	components: {
		OrderItem,
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
		}),
		newOrder() {
			this.$router.push({ name: 'ProductCatalogue' })
		},
		clearUser() {
			delete localStorage.authenticationToken
			delete localStorage.username
			delete localStorage.firstName
			delete localStorage.lastName
			delete localStorage.email
		},
		logOut() {
			this.clearUser()
			this.$router.push({ name: 'SignIn' })
		},
		onError(error) {
			if (error == null) {
				return
			} else {
				console.log(error.message)
				if (error.message.includes('GraphQL error: User not signed in')) {
					this.$router.push({ name: 'SignIn' })
					this.clearUser()
				}
			}
			return error
		},
	},
}
</script>