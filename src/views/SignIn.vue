<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-title>
					Zaphyr Log ind
				</ion-title>
				<ion-buttons slot="end">
					<ion-button @click="$router.push({ name: 'About' })">
						<ion-icon slot="icon-only" name="info" size="large" />
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ion-grid>
				<ion-row>
					<ion-col>
						<form @submit.prevent="mutate">
							<div>
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
							</div>
							<ion-button @click="signIn()" expand="block">log Ind</ion-button>
							<ion-button
								@click="$router.push({ name: 'RegisterUser' })"
								color="primary"
								fill="outline"
								expand="block"
								>Opret Bruger</ion-button
							>
						</form>
					</ion-col>
				</ion-row>
				<ion-row>
					<ion-col>
						<ion-card>
							<ion-card-header>
								<ion-card-title> Obs:</ion-card-title>
							</ion-card-header>
							<ion-card-content class="ion-text-justify">
								<p>
									Denne app virker bedst hvis den bliver downloadet til din
									hjemmeskærm, benyt derfor gerne denne funktion for den bedst
									mulige oplevelse.
								</p>
								<br />
								<p>
									Appen er stadig i testfasen, og derfor vil der være fejl og
									mangler, rapportér venligst disse hvis du skulle opleve dem.
								</p>
							</ion-card-content>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import { addIcons } from 'ionicons'
import { informationCircle } from 'ionicons/icons'

addIcons({
	'ios-info': informationCircle,
	'md-info': informationCircle,
})

export default {
	name: 'SignIn',
	data() {
		return {
			email: '',
			password: '',
		}
	},
	watch: {},
	methods: {
		...mapActions({ onError: 'onError' }),
		signIn() {
			this.$apollo
				.mutate({
					mutation: require('../graphql/signIn.gql'),
					variables: {
						email: this.email,
						password: this.password,
					},
				})
				.then(response => {
					localStorage.authenticationToken =
						response.data.signIn.authenticationToken
					localStorage.uid = response.data.signIn.user.id
					localStorage.email = response.data.signIn.user.email
					localStorage.username = response.data.signIn.user.username
					localStorage.firstName = response.data.signIn.user.firstName
					localStorage.lastName = response.data.signIn.user.lastName

					this.$router.push({ name: 'OrderHistory' })
				})
				.catch(error => {
					this.onError(error)
				})
		},
		onLoad() {
			return this.$ionic.loadingController
				.create({
					message: 'Please wait...',
					duration: this.timeout,
				})
				.then(loading => {
					setTimeout(function() {
						loading.dismiss()
					}, this.timeout)
					return loading.present()
				})
		},
	},
}
</script>
