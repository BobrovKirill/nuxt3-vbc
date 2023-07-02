<script setup lang="ts">
import { isValidate } from '~/utils';

const props = defineProps({
	inputItem: Object,
});
const emits = defineEmits(['checkInput']);
// Проверяем является ли инпут с типом пароль
const isPasswordType = (text) => text === 'password';
// Если инпун с паролем оборачиваем в реф
const inputType = isPasswordType(props.inputItem.type)
	? ref(props.inputItem.type)
	: props.inputItem.type;
// меняем тип инпута при нажатии на кнопку
function toggleShowPassord() {
	inputType.value = isPasswordType(inputType.value) ? 'text' : 'password';
}

// Запускаем валидацию
function checkInput({ target }) {
	if (isValidate(target)) {
		console.log(target);
		emits('checkInput', {
			name: target.name,
			value: target.value,
		});
	}
}
</script>

<template>
	<div class="label">
		<label class="hidden-absolute" :for="props.inputItem.name">{{
			props.inputItem.label
		}}</label>
		<svg v-if="props.inputItem.icon" class="icon">
			<use :xlink:href="`#${props.inputItem.icon}`" />
		</svg>
		<input
			:id="props.inputItem.name"
			class="input"
			:type="inputType"
			:name="props.inputItem.name"
			required
			:autocomplete="props.inputItem.name"
			:placeholder="props.inputItem.name"
			@input="checkInput"
		/>
		<button
			v-if="isPasswordType(props.inputItem.type)"
			type="button"
			class="eye"
			@click="toggleShowPassord"
		>
			<svg class="mx-auto h-[30px] w-[30px]">
				<use xlink:href="#eye" />
			</svg>
		</button>
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
