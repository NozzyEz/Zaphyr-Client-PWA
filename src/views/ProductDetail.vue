<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-back-button @click="isAdded" />
				</ion-buttons>
				<ion-title>
					Produkt Detaljer
				</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ApolloQuery
				:query="require('../graphql/product.gql')"
				:variables="{ id: pid }"
			>
				<template v-slot="{ result: { loading, error, data } }">
					<div v-if="loading">Loading in data</div>
					<div v-if="error">{{ error }}</div>
					<div v-if="data">
						<ion-card>
							<img src="../assets/coq-au-vin-1.jpg" />
							<ion-card-header>
								<ion-card-subtitle>Restauranten tilbyder:</ion-card-subtitle>
								<ion-card-title>{{ data.product.name }}</ion-card-title>
							</ion-card-header>

							<ion-card-content>
								{{ data.product.description }}
								<ion-grid>
									<ion-row>
										<ion-col>
											<ion-input
												:value="amount"
												@input="amount = $event.target.value"
												min="0"
												type="number"
											/>
										</ion-col>
										<ion-col size="8">
											<div class="ion-text-end">
												<ion-button @click="amount++" fill="clear">
													<ion-icon
														slot="icon-only"
														name="add-outline"
														size="large"
													/>
												</ion-button>
												<ion-button
													@click="amount > 0 ? amount-- : amount"
													fill="clear"
												>
													<ion-icon
														slot="icon-only"
														name="remove-circle"
														size="large"
													/>
												</ion-button>
											</div>
										</ion-col>
									</ion-row>
									<ion-row>
										<ion-col>
											<ion-button @click="amount = 0" color="danger">
												<ion-icon slot="icon-only" name="trash" size="large" />
											</ion-button>
										</ion-col>
										<ion-col>
											<div class="ion-text-end">
												{{ data.product.price }} DKK
											</div>
										</ion-col>
									</ion-row>
								</ion-grid>
							</ion-card-content>
						</ion-card>
					</div>
				</template>
			</ApolloQuery>
		</ion-content>
		<ion-footer>
			<ion-grid>
				<ion-row>
					<ion-col>
						<strong>Total : {{ sumTotal }} DKK</strong>
					</ion-col>
					<ion-col>
						<ion-button expand="block" @click="finalize">
							Bestil og Betal
						</ion-button>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-footer>
	</div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import { addIcons } from 'ionicons'
import { addCircle, removeCircle, trash } from 'ionicons/icons'

addIcons({
	'ios-add-outline': addCircle,
	'md-add-outline': addCircle,
	'ios-remove-circle': removeCircle,
	'md-remove-circle': removeCircle,
	'ios-trash': trash,
	'md-trash': trash,
})

export default {
	name: 'ProductDetail',
	data() {
		return {
			product: {},
			pid: parseInt(this.$store.state.activeProduct),
			total: this.$store.state.sumTotal,
		}
	},
	watch: {
		amount() {
			// console.log('Watcher amount fired')
		},
	},
	computed: {
		...mapState({
			basket: 'newOrder',
		}),
		...mapGetters({
			sumTotal: 'getSumTotal',
		}),

		amount: {
			get() {
				// console.log('Getter Fired', this.$store.state.newOrder[this.id])
				return this.basket[this.pid.toString()]
			},
			set(val) {
				val = parseInt(val) || 0
				this.$store.commit('UPDATE_BASKET', [this.product, val])
			},
		},
	},
	methods: {
		...mapActions({
			toCheckout: 'toCheckout',
			updateBasket: 'updateBasket',
			removeFromBasket: 'removeFromBasket',
		}),
		getProduct() {
			this.$apollo
				.query({
					query: require('../graphql/product.gql'),
					variables: {
						id: this.pid,
					},
				})
				.then(data => {
					this.product = data.data.product
				})
		},
		isAdded(pid) {
			const id = pid.toString()
			if (this.basket[id] == 0) this.removeFromBasket(id)
		},
		finalize() {
			this.isAdded(this.pid)
			this.toCheckout()
		},
	},
	mounted() {
		// console.log(this.product)
		this.product = this.getProduct()
	},
}
</script>

<style>
</style>