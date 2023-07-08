<script setup lang="ts">
const props = defineProps({
	footerData: Object,
	isValid: Boolean,
});
const emits = defineEmits(['submit', 'showPopup']);
function submit() {
	emits('submit');
}
function showPopup() {
	emits('showPopup');
}
</script>

<template>
	<div class="flex w-full flex-col items-center gap-5">
		<button
			type="submit"
			class="submit-btn"
			:disabled="!isValid"
			@click.prevent="submit"
		>
			{{ props.footerData.button }}
		</button>
		<p class="text-center text-base text-[#71717A]">
			{{ props.footerData.text }}

			<NuxtLink
				v-if="props.footerData.link.url !== '/'"
				class="nuxt text-[#8098F9]"
				:to="props.footerData.link.url"
			>
				{{ props.footerData.link.text }}
			</NuxtLink>
			<a
				v-if="props.footerData.link.url === '/'"
				class="link text-[#8098F9]"
				:href="props.footerData.link.url"
				@click.prevent="showPopup"
			>
				{{ props.footerData.link.text }}
			</a>
		</p>
	</div>
</template>

<style>
.submit-btn {
	@apply flex h-[64px] w-full max-w-[453px] items-center justify-center rounded-[10px] bg-[#8098F9] p-2.5 disabled:opacity-50;
	@apply font-inter text-xl/[24px] uppercase text-[#ffffff];
}
</style>
