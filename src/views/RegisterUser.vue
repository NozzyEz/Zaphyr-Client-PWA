<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/signin"></ion-back-button>
				</ion-buttons>
				<ion-title>Opret Bruger</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<form @submit.prevent="mutate">
				<ion-input
					:value="verificationCode"
					@input="verificationCode = $event.target.value"
					placeholder="Verificeringskode"
					type="verificationCode"
					id="verificationCode"
				/>
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
				<ion-button @click="registerUser()" expand="block">Opret</ion-button>
			</form>
		</ion-content>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
	name: 'RegisterUser',
	data() {
		return {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			verificationCode: '',
		}
	},
	methods: {
		...mapActions({ onError: 'onError' }),
		registerUser() {
			this.$apollo
				.mutate({
					mutation: require('../graphql/register.gql'),
					variables: {
						firstName: this.firstName,
						lastName: this.lastName,
						username: this.username,
						email: this.email,
						password: this.password,
						passwordConfirmation: this.passwordConfirmation,
						verificationCode: this.verificationCode,
					},
					// error(error) {
					// 	console.log(error)
					// },
				})
				.then(response => {
					localStorage.authenticationToken =
						response.data.registerUser.user.authenticationToken
					localStorage.uid = response.data.registerUser.user.id
					localStorage.email = response.data.registerUser.user.email
					localStorage.username = response.data.registerUser.user.username
					localStorage.firstName = response.data.registerUser.user.firstName
					localStorage.lastName = response.data.registerUser.user.lastName

					this.$router.push({ name: 'OrderHistory' })
				})
				.catch(error => {
					this.onError(error)
				})
		},
		presentLoading() {
			return this.$ionic.loadingController
				.create({
					cssClass: 'ion-loading-spinner',
					message: 'Vent venligst',
					duration: this.timeout,
				})
				.then(loading => {
					setTimeout(function() {
						loading.dismiss()
					}, this.timeout)
					return loading.present()
				})
		},
		// onError(err) {
		// 	return this.$ionic.alertController
		// 		.create({
		// 			header: 'Fejl',
		// 			subHeader: 'Subtitle',
		// 			message: err,
		// 			buttons: ['OK'],
		// 		})
		// 		.then(a => a.present())
		// },
	},
}
</script>

<style scoped>
.ion-loading-spinner {
	--background: #222;
	--spinner-color: #fff;

	color: #fff;
}
</style>