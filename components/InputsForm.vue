<script setup lang="ts">
import TheInput from '~/components/UI/TheInput.vue';

const props = defineProps({
	inputsData: Object,
});
function checkInputs(data) {
	console.log(data);
}
</script>

<template>
	<div class="flex w-full flex-col items-center gap-2.5">
		<TheInput
			v-for="inputItem in props.inputsData.inputList"
			:key="inputItem.key"
			:input-item="inputItem"
			@check-input="checkInputs"
		/>
	</div>
</template>

<style>
.label {
	@apply relative h-[64px] w-full max-w-[453px];
}
.input {
	@apply h-full w-full rounded-[10px] border-2 border-[#8098f9]/50 bg-[#8098f9]/10 p-2.5;
	@apply font-inter text-lg/[24px] text-[#2d31a6] placeholder:text-[#2d31a6]/20;
}
.icon {
	@apply absolute left-2.5 top-1/2 z-10 h-[30px] w-[30px] -translate-y-2/4;
}
.icon + input {
	@apply pl-[50px];
}
.hidden-absolute {
	@apply absolute left-[-1000px] top-[-1000px] h-[1px] w-[1px];
}
.eye {
	@apply absolute right-0 top-0 z-10 h-full w-[50px];
}
</style>
