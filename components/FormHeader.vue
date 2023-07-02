<script setup lang="ts">
const props = defineProps({
	headerData: Object,
});
</script>

<template>
	<div class="flex w-full flex-col gap-[25px]">
		<h1 class="text-bold text-center text-[40px]/[39px] text-[#09090B]">
			{{ props.headerData.title }}
		</h1>
		<p
			class="text-[15px]/[24px] font-medium text-[#71717A]"
			:class="{
				'two-lines flex items-center justify-between':
					props.headerData.type === 'login',
			}"
		>
			{{ props.headerData.subtitle }}
		</p>
	</div>
</template>

<style>
.two-lines {
	@apply after:block after:h-[1px] after:w-[120px] after:bg-[#71717A] after:content-[''];
	@apply before:block before:h-[1px] before:w-[120px] before:bg-[#71717A] before:content-[''];
}
</style>
