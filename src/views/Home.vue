<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<ApolloQuery :query="require('../graphql/users.gql')">
			<template v-slot="{ result: { loading, error, data } }">
				<div v-if="loading">Loading in data</div>
				<div v-if="error">{{ error }}</div>
				<div v-if="data">
					<div v-for="user in data.users" :key="user.id">
						{{ user.firstName }} {{ user.lastName }} - {{ user.email }}
					</div>
				</div>
			</template>
		</ApolloQuery>
	</div>
</template>

<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {},
}
</script>
