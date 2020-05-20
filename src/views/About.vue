<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons>
					<ion-back-button default-href="/"></ion-back-button>
				</ion-buttons>
				<ion-title>Om Zaphyr Appen</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-card>
			<ion-card-header>
				<ion-card-subtitle>
					QR kode til nem deling:
				</ion-card-subtitle>
			</ion-card-header>
			<ion-card-content>
				<div class="ion-text-center">
					<qriously value="https://zaphyr-pwa.web.app/" :size="250" />
				</div>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-content>
				<p>
					Zaphyr appen er udviklet af Mark Sahlgreen og Elena Catalina
					Barbulescu, 2020
				</p>
			</ion-card-content>
		</ion-card>
	</div>
</template>

<script>
export default {
	name: 'About',
}
</script>

<style>
</style>