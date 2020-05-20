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
						<ApolloMutation
							:mutation="require('../graphql/updateUser.gql')"
							:variables="{
								id: parseInt(userId),
								firstName,
								lastName,
								username,
								email,
							}"
							@done="onDone"
						>
							<template v-slot="{ loading, error, mutate }">
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
									<ion-button @click="mutate()" expand="block">Gem</ion-button>
									<h3 v-if="error">{{ error }}</h3>
									<h3 v-if="loading">Loading</h3>
								</form>
							</template>
						</ApolloMutation>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
		<ion-footer>
			<div class="ion-padding">
				<ApolloMutation
					:mutation="require('../graphql/updateUser.gql')"
					:variables="{
						id: parseInt(userId),
						password,
						passwordConfirmation,
					}"
					@done="onDone"
				>
					<template v-slot="{ loading, error, mutate }">
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
							<ion-button @click="mutate()" expand="block"
								>Opdater Password</ion-button
							>
							<h3 v-if="error">{{ error }}</h3>
							<h3 v-if="loading">Loading</h3>
						</form>
					</template>
				</ApolloMutation>
			</div>
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
		}),
		onDone(val) {
			//TODO: Write the method to save the variables to localStorage
			localStorage.authenticationToken =
				val.data.updateUser.user.authenticationToken
			localStorage.uid = val.data.updateUser.user.id
			localStorage.email = val.data.updateUser.user.email
			localStorage.username = val.data.updateUser.user.username
			localStorage.firstName = val.data.updateUser.user.firstName
			localStorage.lastName = val.data.updateUser.user.lastName

			this.showToast('Bruger er opdateret')
			this.$router.push({ name: 'OrderHistory' })
		},
	},
}
</script>

<style>
</style>