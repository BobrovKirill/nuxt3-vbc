<script setup lang="ts">
const infoData = {
	infoImgPath: '/_nuxt/assets/images/signup-img.png',
	imgAlt: 'изображение связей',
};
const formData = {
	headerData: {
		type: 'signup',
		title: 'Create your account',
		subtitle: 'Unlock all Features!',
	},
	inputsData: {
		type: 'login',
		inputList: [
			{
				id: '1',
				type: 'text',
				label: 'user',
				name: 'user',
				icon: 'user',
				required: false,
			},
			{
				id: '2',
				type: 'text',
				label: 'email',
				name: 'email',
				icon: 'email',
				required: true,
			},
			{
				id: '3',
				type: 'password',
				label: 'password',
				name: 'password',
				icon: 'password',
				required: true,
			},
			{
				id: '4',
				type: 'password',
				label: 'confirm-password',
				name: 'confirm-password',
				icon: 'password',
				required: true,
			},
			{
				id: '5',
				type: 'checkbox',
				label: 'Accept terms and conditions',
				name: 'check',
				icon: '',
				required: false,
			},
		],
	},
	footerData: {
		button: 'sign up',
		text: 'You have account? ',
		linkList: [{ id: '1', url: '/', text: 'Login now' }],
	},
};
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<TheForm :form-data="formData" />
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>Join us!</template>
			<template #text>
				Just go through the boring process of creating an account.
			</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
