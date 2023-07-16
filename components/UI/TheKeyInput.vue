<script setup lang="ts">
import type { PropType } from 'vue';
import { InputType } from '~/components/types';

const props = defineProps({
	inputItem: {
		type: Object as PropType<InputType>,
		required: true,
	},
});
const emits = defineEmits(['sendValue']);
const keyInput = ref<HTMLDivElement | null>(null);
const nextKeyInput = ref<HTMLDivElement | null>(null);

function sendEmit(input: HTMLInputElement) {
	const name = input.name;
	const type = input.type;
	const value = input.value;
	const required = input.required;
	emits('sendValue', { name, type, value, required });
}
function inputListener(event: Event) {
	const target = event.target as HTMLInputElement;
	sendEmit(target);
}
// Не даем ввести пользователю больше 1 цифры, обновляем на последнюю введенную, после ввода перекидываем фокус на следующий инпут
const keyValue = ref<string | undefined>('');
watch(keyValue, (newValue: string, oldValue: string) => {
	if (oldValue === '') {
		keyValue.value = newValue;
	} else {
		keyValue.value = newValue.at(-1);
	}
	nextKeyInput.value?.querySelector('input').focus();
});
onMounted(() => {
	nextKeyInput.value = keyInput.value.nextElementSibling;
});
</script>

<template>
	<div ref="keyInput" class="label">
		<label class="sr-only" :for="props.inputItem.name">
			{{ props.inputItem.label }}
		</label>
		<input
			:id="props.inputItem.name"
			v-model="keyValue"
			class="input"
			:type="props.inputItem.type"
			:data-invalid="props.inputItem.valid.value"
			:name="props.inputItem.name"
			:required="props.inputItem.required"
			:autocomplete="props.inputItem.autocomplete"
			:placeholder="props.inputItem.placeholder"
			@input="inputListener"
		/>
	</div>
</template>

<style>
.label {
	@apply relative h-[64px] w-full;
}
.input {
	@apply h-full w-full rounded-[10px] border-2 border-[#8098f9]/50 bg-[#8098f9]/10 p-2.5;
	@apply font-inter text-lg/[24px] text-[#206D93] placeholder:text-[#2d31a6]/20;
}
.input[data-invalid='false'] {
	@apply border-red-500;
}
input:-webkit-autofill {
	-webkit-text-fill-color: #2d63b2 !important;
}
.icon + input {
	@apply pl-[50px];
}
</style>
