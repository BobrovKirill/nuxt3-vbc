<script setup lang="ts">
const infoData = {
	infoImgPath: '/_nuxt/assets/images/login-img.png',
	imgAlt: 'изображение гаджетов',
};
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<LoginForm />
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>Connect with any device.</template>
			<template #text>Everything you need is an internet connection.</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
