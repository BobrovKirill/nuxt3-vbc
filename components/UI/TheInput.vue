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

// Проверяем является ли инпут с типом пароль
const isPasswordType = (text: string): boolean => text === 'password';

// Если инпут с паролем оборачиваем в реф
const inputType: string = isPasswordType(props.inputItem.type)
	? ref<string>(props.inputItem.type).value
	: props.inputItem.type;

const eyeIcon = ref<null | SVGUseElement>(null);
const input = ref<null | HTMLInputElement>(null);
// меняем тип инпута при нажатии на кнопку
function toggleShowPassword() {
	if (!input.value || !eyeIcon.value) {
		return;
	}
	const isPassword = isPasswordType(input.value.type);
	input.value.type = isPassword ? 'text' : 'password';
	eyeIcon.value.setAttribute(
		'xlink:href',
		`${isPassword ? '#open-eye' : '#close-eye'}`,
	);
}
function sendEmit(input: HTMLInputElement) {
	const name = input.name;
	const type = input.type;
	const value = input.value;
	const required = input.required;
	emits('sendValue', { name, type, value, required });
}
onMounted(() => {
	if (input.value && input.value.value) {
		sendEmit(input.value);
	}
});
function inputListener(event: Event) {
	const target = event.target as HTMLInputElement;
	sendEmit(target);
}
</script>

<template>
	<div class="label">
		<label class="sr-only" :for="props.inputItem.name">{{
			props.inputItem.label
		}}</label>
		<svg v-if="props.inputItem.icon" class="icon">
			<use :xlink:href="`#${props.inputItem.icon}`" />
		</svg>
		<input
			:id="props.inputItem.name"
			ref="input"
			class="input"
			:type="inputType"
			:data-invalid="props.inputItem.valid.value"
			:name="props.inputItem.name"
			:required="props.inputItem.required"
			:autocomplete="props.inputItem.autocomplete"
			:placeholder="props.inputItem.placeholder"
			@input="inputListener"
		/>
		<button
			v-if="isPasswordType(props.inputItem.type)"
			type="button"
			class="eye"
			@click="toggleShowPassword"
		>
			<svg class="mx-auto h-[30px] w-[30px]">
				<use ref="eyeIcon" xlink:href="#close-eye" />
			</svg>
		</button>
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
.icon {
	@apply absolute left-2.5 top-1/2 z-10 h-[30px] w-[30px] -translate-y-2/4;
}
.icon + input {
	@apply pl-[50px];
}
.eye {
	@apply absolute right-0 top-0 z-10 h-full w-[50px];
}
</style>
