<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button default-href="/signin"></ion-back-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<ApolloMutation
				:mutation="require('../graphql/register.gql')"
				:variables="{
					firstName,
					lastName,
					userName,
					email,
					password,
					passwordConfirmation,
					verificationCode,
				}"
				@done="onDone"
			>
				<template v-slot="{ loading, error, mutate }">
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
							:value="userName"
							@input="userName = $event.target.value"
							placeholder="Focus nummer"
							type="userName"
							id="userName"
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
						<ion-button @click="mutate()" expand="block">Opret</ion-button>
						<h3 v-if="error">{{ error }}</h3>
						<h3 v-if="loading">Loading</h3>
					</form>
				</template>
			</ApolloMutation>
		</ion-content>
	</div>
</template>

<script>
export default {
	name: 'RegisterUser',
	data() {
		return {
			firstName: '',
			lastName: '',
			userName: '',
			email: '',
			password: '',
			passwordConfirmation: '',
			verificationCode: '',
		}
	},
	methods: {
		onDone() {
			// Pass
		},
	},
}
</script>

<style>
</style>