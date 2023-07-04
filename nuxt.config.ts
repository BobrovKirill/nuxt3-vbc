// https://nuxt.com/docs/api/configuration/nuxt-config
import eslint from 'vite-plugin-eslint';

export default defineNuxtConfig({
	app: {
		head: {
			charset: 'utf-16',
			viewport: 'width=500, initial-scale=1',
			htmlAttrs: {
				lang: 'ru',
			},
			title: 'ВБЦ КириллБ',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				// <meta name="description" content="My amazing site">
				{ name: 'description', content: 'тестовое задание' },
			],
			script: [],
			link: [],
			style: [],
			noscript: [],
		},
	},
	postcss: {
		plugins: {
			'postcss-import': {},
			tailwindcss: {},
			autoprefixer: {
				grid: 'autoplace',
			},
		},
	},
	css: ['~/style.css'],
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
	imports: {
		autoImport: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	vite: {
		plugins: [eslint()],
	},
});
