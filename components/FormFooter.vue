<script setup lang="ts">
const props = defineProps({
	footerData: Object,
	isValid: Boolean,
});
const emits = defineEmits(['submit']);
function submit() {
	emits('submit');
}
</script>

<template>
	<div class="flex w-full flex-col items-center gap-5">
		<button
			type="submit"
			class="submit-btn"
			:disabled="!isValid.value"
			@click.prevent="submit"
		>
			{{ props.footerData.button }}
		</button>
		<p class="text-center text-base text-[#71717A]">
			{{ props.footerData.text }}
			<span
				v-for="item in props.footerData.linkList"
				:key="item.id"
				class="text-[#8098F9]"
			>
				<NuxtLink :to="item.url">{{ item.text }}</NuxtLink>
			</span>
		</p>
	</div>
</template>

<style>
.submit-btn {
	@apply flex h-[64px] w-full max-w-[453px] items-center justify-center rounded-[10px] bg-[#8098F9] p-2.5 disabled:opacity-50;
	@apply font-inter text-xl/[24px] uppercase text-[#ffffff];
}
</style>
