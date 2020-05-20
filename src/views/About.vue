<template>
	<div class="ion-page">
		<ion-header>
			<ion-toolbar>
				<ion-buttons>
					<ion-back-button />
				</ion-buttons>
				<ion-title>Om</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-card>
			<ion-card-header>
				<ion-card-title> Om Appen</ion-card-title>
			</ion-card-header>
			<ion-card-content>
				<p>
					Denne app er udviklet af Mark Sahlgreen og Elena Catalina Barbulescu
				</p>
			</ion-card-content>
		</ion-card>
		<ion-card>
			<ion-card-header>
				<ion-card-subtitle>
					QR kode til nem deling:
				</ion-card-subtitle>
			</ion-card-header>
			<ion-card-content>
				<img src="../assets/qr.png" />
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