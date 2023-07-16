<script setup lang="ts">
import type { PropType } from 'vue';
import { FooterType } from '~/components/types';

const props = defineProps({
	footerData: {
		type: Object as PropType<FooterType>,
		required: true,
	},
	isValid: Boolean,
});
</script>

<template>
	<div class="flex w-full flex-col items-center gap-5">
		<button type="submit" class="submit-btn" :disabled="!isValid">
			{{ props.footerData.button }}
		</button>
		<p
			v-if="props.footerData.text"
			class="text-center text-base text-[#71717A]"
		>
			{{ props.footerData.text }}

			<NuxtLink class="nuxt text-[#8098F9]" :to="props.footerData.link.url">
				{{ props.footerData.link.text }}
			</NuxtLink>
		</p>
	</div>
</template>

<style>
.submit-btn {
	@apply flex h-[64px] w-full max-w-[453px] items-center justify-center rounded-[10px] bg-[#8098F9] p-2.5 disabled:opacity-50;
	@apply font-inter text-xl/[24px] uppercase text-[#ffffff];
}
</style>
