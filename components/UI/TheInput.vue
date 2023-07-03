<script setup lang="ts">
type Props = {
	inputItem: {
		type: string;
		value: string;
	};
};

const props: Props = defineProps({
	inputItem: Object,
});
const emits = defineEmits(['sendValue']);

// Проверяем является ли инпут с типом пароль
const isPasswordType = (text: string): boolean => text === 'password';

// Если инпут с паролем оборачиваем в реф
const inputType = isPasswordType(props.inputItem.type)
	? ref<string | undefined>(props.inputItem.type)
	: props.inputItem.type;

const eyeIcon = ref(null);
// меняем тип инпута при нажатии на кнопку
function toggleShowPassord() {
	const isPassword = isPasswordType(inputType.value);
	inputType.value = isPassword ? 'text' : 'password';
	eyeIcon.value.setAttribute(
		'xlink:href',
		`${isPassword ? '#open-eye' : '#close-eye'}`,
	);
}

function setValue(event: { target: HTMLInputElement }) {
	const target = event.target;
	emits('sendValue', {
		name: target.name,
		value: target.value,
	});
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
			class="input"
			:type="inputType"
			:name="props.inputItem.name"
			required
			:autocomplete="props.inputItem.name"
			:placeholder="props.inputItem.name"
			@input="setValue"
		/>
		<button
			v-if="isPasswordType(props.inputItem.type)"
			type="button"
			class="eye"
			@click="toggleShowPassord"
		>
			<svg class="mx-auto h-[30px] w-[30px]">
				<use ref="eyeIcon" xlink:href="#close-eye" />
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
	@apply font-inter text-lg/[24px] text-[#206D93] placeholder:text-[#2d31a6]/20;
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