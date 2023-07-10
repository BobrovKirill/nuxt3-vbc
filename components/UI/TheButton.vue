<script setup lang="ts">
type Props = {
	type: 'button' | 'submit';
	disabled: boolean;
};
const props: Props = defineProps({
	type: String,
	disabled: Boolean,
});
const emits = defineEmits(['buttonClick']);
function buttonClick() {
	emits('buttonClick');
}
</script>

<template>
	<button
		:type="props.type"
		class="submit-btn"
		:disabled="props.disabled"
		@click.prevent="buttonClick"
	>
		<slot />
	</button>
</template>

<style>
.submit-btn {
	@apply flex h-[64px] w-full max-w-[453px] items-center justify-center rounded-[10px] bg-[#8098F9] p-2.5 disabled:opacity-50;
	@apply font-inter text-xl/[24px] uppercase text-[#ffffff];
}
</style>
