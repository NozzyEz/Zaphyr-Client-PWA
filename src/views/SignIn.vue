<template>
	<div class="ion-page">
		<ion-content class="ion-padding">
			<ion-grid>
				<ion-col>
					<ApolloMutation
						:mutation="require('../graphql/signIn.gql')"
						:variables="{ email, password }"
						@done="onDone"
					>
						<template v-slot="{ loading, error, mutate }">
							<form @submit.prevent="mutate">
								<label for="email">Email</label>
								<ion-input
									:value="email"
									@input="email = $event.target.value"
									type="email"
									id="email"
								/>
								<label for="password">Password</label>
								<ion-input
									:value="password"
									@input="password = $event.target.value"
									type="password"
									id="password"
								/>
								<ion-button @click="mutate()" expand="block"
									>log Ind</ion-button
								>
								<ion-button
									@click="this.$router.push({ name: 'RegisterUser' })"
									color="light"
									expand="block"
									>Opret Bruger</ion-button
								>
								<h3 v-if="error">{{ error }}</h3>
								<h3 v-if="loading">Loading</h3>
							</form>
						</template>
					</ApolloMutation>
					{{ token }}
				</ion-col>
			</ion-grid>
		</ion-content>
	</div>
</template>

<script>
export default {
	name: 'SignIn',
	data() {
		return {
			email: '',
			password: '',
			token: '',
		}
	},
	methods: {
		onDone(val) {
			// alert('worked')
			// Save the token in variable before sending it on to localStorage
			this.token = val.data.signIn.authenticationToken
			localStorage.authenticationToken = this.token
			this.$router.push({ name: 'OrderHistory' })
		},
	},
}
</script>
