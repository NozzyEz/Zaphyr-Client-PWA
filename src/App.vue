<template>
	<div id="app">
		<ion-app>
			<ion-vue-router />
		</ion-app>
	</div>
</template>

<script>
export default {
	data() {
		return {
			refreshing: false,
			registration: null,
			updateExists: false,
		}
	},
	created() {
		document.addEventListener('swUpdated', this.showRefreshUI, { once: true })

		navigator.serviceWorker.addEventListener('controllerchange', () => {
			if (this.refreshing) return
			this.refreshing = true
			window.location.reload()
		})
	},
	methods: {
		showRefreshUI(e) {
			this.registration = e.detail
			this.updateExists = true
			this.showToast()
		},
		refreshApp() {
			this.updateExists = false

			if (!this.registration || !this.registration.waiting) {
				return
			}
			this.registration.waiting.postMessage('skipWaiting')
		},
		async showToast() {
			if (this.updateExists) {
				const toast = await this.$ionic.toastController.create({
					message: 'Der findes en nyere version',
					position: 'top',
					buttons: [
						{
							side: 'end',
							text: 'Opdater',
							handler: () => {
								console.log('update clicked')
								this.refreshApp()
							},
						},
					],
					showCloseButton: true,
				})
				await toast.present()
				this.updateExists = false
			}
		},
	},
}
</script>

