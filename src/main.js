import VueApollo from 'vue-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloLink } from 'apollo-link'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

const httpLink = new HttpLink({
	uri: 'https://obscure-ocean-47876.herokuapp.com//graphql'
})

const authMiddelware = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem('authenticationToken')
	// console.log(token)

	operation.setContext({
		headers: {
			authorization: token ? `Bearer ${token}` : null
		}
	})

	return forward(operation)
})

Vue.use(VueApollo)
const apolloClient = new ApolloClient({
	link: authMiddelware.concat(httpLink),
	cache: new InMemoryCache(),
	connectToDevTools: true
})

const apolloProvider = new createProvider({
	defaultClient: apolloClient,
	defaultOptions: { $loadingKey: 'loading' }
})

new Vue({
	router,
	apolloProvider: apolloProvider,
	render: (h) => h(App)
}).$mount('#app')
