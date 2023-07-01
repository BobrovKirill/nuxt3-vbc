<script lang="ts">
import { defineComponent } from 'vue';
import { SymbolKind } from 'vscode-languageserver-types';
import String = SymbolKind.String;

export default defineComponent({
	name: 'TheInfo',
	props: {
		imgSrc: String,
		imgAlt: String,
	},
});
</script>

<template>
	<div class="flex flex-col items-center justify-center bg-[#6172F3]">
		<div
			class="relative z-[1] h-[303px] w-full max-w-[303px] md:h-[606px] md:max-w-[606px]"
		>
			<picture class="h-full w-full">
				<img class="h-full object-contain" :src="imgSrc" :alt="imgAlt" />
			</picture>
			<div class="circle" />
		</div>

		<p class="py-[50px] text-center text-xl font-bold text-[#E0EAFF]">
			<slot name="title" />
			<span class="block text-center text-base font-medium opacity-75">
				<slot name="text" />
			</span>
		</p>
	</div>
</template>

<style>
.circle {
	background: linear-gradient(
				174deg,
				rgba(164, 188, 253, 0.2) 0%,
				rgba(68, 76, 231, 0.16) 100%
			)
			padding-box,
		radial-gradient(
				50% 50% at 50% 50%,
				rgba(68, 76, 231, 0.16) 0%,
				rgba(68, 76, 231, 0.06) 100%
			)
			border-box;
	@apply absolute left-0 top-0 -z-[1] h-full w-full rounded-full border-[20px] border-transparent md:border-[39px];
}
</style>
