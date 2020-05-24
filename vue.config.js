module.exports = {
	pwa: {
		workboxPluginMode: 'InjectManifest',
		workboxOptions: {
			swSrc: './src/sw.js',
			swDest: 'service-worker.js'
			// navigateFallback: '/index.html',
			// runtimeCaching: [
			// 	{
			// 		urlPattern: new RegExp('^https://obscure-ocean-47876.herokuapp.com//graphql'),
			// 		handler: 'networkFirst',
			// 		options: {
			// 			networkTimeoutSeconds: 20,
			// 			cacheName: 'api-cache',
			// 			cacheableResponse: {
			// 				statuses: [ 0, 200 ]
			// 			}
			// 		}
			// 	}
			// ]
		}
	}
}
