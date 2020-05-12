<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>Order History</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding ion-text-center">
			<img alt="Vue logo" src="../assets/logo.png" />
			<ApolloQuery :query="require('../graphql/users.gql')">
				<template v-slot="{ result: { loading, error, data } }">
					<div v-if="loading">Loading in data</div>
					<div v-if="onError(error)">{{ error }}</div>
					<div v-if="data">
						<div v-for="user in data.users" :key="user.id">
							{{ user.firstName }} {{ user.lastName }} - {{ user.email }}
						</div>
					</div>
				</template>
			</ApolloQuery>
		</ion-content>
		<ion-footer>
			<div class="ion-padding">
				<ion-button
					@click="$router.push({ name: 'ProductCatalogue' })"
					expand="block"
					color="success"
					>Ny Bestilling</ion-button
				>
				<ion-button expand="block" color="primary" fill="outline"
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
export default {
	name: 'OrderHistory',
	data() {
		return {}
	},
	components: {},
	methods: {
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