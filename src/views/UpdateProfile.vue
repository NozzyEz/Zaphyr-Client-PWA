<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>
					Profil
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-grid>
				<ion-row>
					<ion-col>
						<form @submit.prevent="mutate">
							<ion-input
								:value="firstName"
								@input="firstName = $event.target.value"
								placeholder="Fornavn"
								type="firstName"
								id="firstName"
							/>
							<ion-input
								:value="lastName"
								@input="lastName = $event.target.value"
								placeholder="Efternavn"
								type="lastName"
								id="lastName"
							/>
							<ion-input
								:value="username"
								@input="username = $event.target.value"
								placeholder="Focus nummer"
								type="username"
								id="username"
							/>
							<ion-input
								:value="email"
								@input="email = $event.target.value"
								placeholder="Email"
								type="email"
								id="email"
							/>
							<ion-button @click="updateUser()" expand="block">Gem</ion-button>
						</form>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<form @submit.prevent="mutate">
							<ion-input
								:value="password"
								@input="password = $event.target.value"
								placeholder="password"
								type="password"
								id="password"
							/>
							<ion-input
								:value="passwordConfirmation"
								@input="passwordConfirmation = $event.target.value"
								placeholder="password confirmation"
								type="password"
								id="passwordConfirmation"
							/>
							<ion-button @click="updatePassword()" expand="block"
								>Opdater Password</ion-button
							>
						</form>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<ion-footer>
			<div class="ion-padding"></div>
		</ion-footer>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'UpdateProfile',
	data() {
		return {
			userId: localStorage.uid,
			firstName: localStorage.firstName,
			lastName: localStorage.lastName,
			username: localStorage.username,
			email: localStorage.email,
			password: '',
			passwordConfirmation: '',
		}
	},
	methods: {
		...mapActions({
			showToast: 'showToast',
			onError: 'onError',
		}),
		updateUser() {
			this.$apollo
				.mutate({
					mutation: require('../graphql/updateUser.gql'),
					variables: {
						id: parseInt(this.userId),
						firstName: this.firstName,
						lastName: this.lastName,
						username: this.username,
						email: this.email,
					},
				})
				.then(response => {
					localStorage.authenticationToken =
						response.data.updateUser.user.authenticationToken
					localStorage.uid = response.data.updateUser.user.id
					localStorage.email = response.data.updateUser.user.email
					localStorage.username = response.data.updateUser.user.username
					localStorage.firstName = response.data.updateUser.user.firstName
					localStorage.lastName = response.data.updateUser.user.lastName

					this.$router.push({ name: 'OrderHistory' })
					this.showToast('Bruger er opdateret')
				})
				.catch(error => {
					this.onError(error)
				})
		},
		updatePassword() {
			this.$apollo
				.mutate({
					mutation: require('../graphql/updateUser.gql'),
					variables: {
						id: parseInt(this.userId),
						password: this.password,
						passwordConfirmation: this.passwordConfirmation,
					},
				})
				.then(response => {
					localStorage.authenticationToken =
						response.data.updateUser.user.authenticationToken
					localStorage.uid = response.data.updateUser.user.id
					localStorage.email = response.data.updateUser.user.email
					localStorage.username = response.data.updateUser.user.username
					localStorage.firstName = response.data.updateUser.user.firstName
					localStorage.lastName = response.data.updateUser.user.lastName

					this.$router.push({ name: 'OrderHistory' })
					this.showToast('Password er opdateret')
				})
				.catch(error => {
					this.onError(error)
				})
		},
	},
}
</script>

<style>
</style>