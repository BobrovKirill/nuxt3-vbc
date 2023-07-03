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
			class="circle grid-col-1 relative z-[1] grid h-[303px] w-full max-w-[303px] grid-rows-1 md:h-[606px] md:max-w-[606px]"
		>
			<picture
				class="col-start-1 col-end-2 row-start-1 row-end-2 h-full w-full"
			>
				<img class="h-full object-contain" :src="imgSrc" :alt="imgAlt" />
			</picture>
			<p
				class="col-start-1 col-end-2 row-start-1 row-end-2 mb-[-152px] self-end py-[50px] text-center text-xl font-bold text-[#E0EAFF]"
			>
				<slot name="title" />
				<span class="block text-center text-base font-medium opacity-75">
					<slot name="text" />
				</span>
			</p>
		</div>
	</div>
</template>

<style>
.circle {
	@apply after:absolute after:left-0 after:top-0 after:-z-[1] after:h-full after:w-full after:rounded-full after:border-[20px] after:border-transparent after:md:border-[39px];
}
.circle:after {
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
}
</style>
