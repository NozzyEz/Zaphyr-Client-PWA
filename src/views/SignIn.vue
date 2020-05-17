<template>
	<div class="ion-page">
		<ion-content class="ion-padding">
			<ion-grid>
				<ion-row>
					<ion-col>
						<ApolloMutation
							:mutation="require('../graphql/signIn.gql')"
							:variables="{ email, password }"
							@done="onDone"
						>
							<template v-slot="{ loading, error, mutate }">
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
									<ion-button @click="mutate()" expand="block"
										>log Ind</ion-button
									>
									<ion-button
										@click="$router.push({ name: 'RegisterUser' })"
										color="primary"
										fill="outline"
										expand="block"
										>Opret Bruger</ion-button
									>
									<h3 v-if="error">{{ error }}</h3>
									<h3 v-if="loading" v-on="onLoad()">
										{{ loading }}
									</h3>
								</form>
							</template>
						</ApolloMutation>
					</ion-col>
				</ion-row>
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
		}
	},
	watch: {},
	methods: {
		onDone(val) {
			// alert('worked')
			// Save the token in variable before sending it on to localStorage
			localStorage.authenticationToken = val.data.signIn.authenticationToken
			localStorage.uid = val.data.signIn.user.id
			localStorage.email = val.data.signIn.user.email
			localStorage.username = val.data.signIn.user.username
			localStorage.firstName = val.data.signIn.user.firstName
			localStorage.lastName = val.data.signIn.user.lastName

			this.$router.push({ name: 'OrderHistory' })
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
