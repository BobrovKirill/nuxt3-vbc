<script setup lang="ts">
import type { PropType } from 'vue';
import { HeaderType } from '~/components/types';

const props = defineProps({
	headerData: {
		type: Object as PropType<HeaderType>,
		required: true,
	},
});
</script>

<template>
	<div
		:class="{ 'items-center gap-[25px]': props.headerData.subtitle }"
		class="flex w-full flex-col"
	>
		<h1 class="text-[40px]/[39px] font-bold text-[#09090B]">
			{{ props.headerData.title }}
		</h1>
		<p v-if="props.headerData.text" class="text-xl/[24px] text-[#71717A]">
			{{ props.headerData.text }}
			<span v-if="props.headerData.email" class="text-[#8098F9]">
				{{ props.headerData.email }}
			</span>
			<span class="block text-base font-bold text-[#8098F9]">
				<NuxtLink v-if="props.headerData.link" :to="props.headerData.link">
					Change email
				</NuxtLink>
			</span>
		</p>
		<p
			v-if="props.headerData.subtitle"
			class="two-lines flex w-full items-center justify-between px-3 text-[15px]/[24px] font-medium text-[#71717A]"
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
