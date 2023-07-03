<script setup lang="ts">
const infoData = {
	infoImgPath: '/_nuxt/assets/images/login-img.png',
	imgAlt: 'изображение гаджетов',
};
const formData = {
	headerData: {
		type: 'login',
		title: 'Login to your Account',
		subtitle: 'with email',
	},
	footerData: {
		button: 'log in',
		text: 'Don’t have account?',
		linkList: [{ id: '1', url: '/signup', text: 'Create an account' }],
	},
	inputsData: {
		type: 'login',
		inputList: [
			{ id: '1', type: 'text', label: 'email', name: 'email', icon: 'email' },
			{
				id: '2',
				type: 'password',
				label: 'password',
				name: 'password',
				icon: 'password',
			},
		],
	},
};
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<TheForm :form-data="formData" />
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>Connect with any device.</template>
			<template #text>Everything you need is an internet connection.</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
