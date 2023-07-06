<script setup lang="ts">
import { isValidate, validRequiredCounter } from '~/utils';
import { useFormState } from '~/store';
const { formState, isChangeValue } = useFormState();

const infoData = {
	infoImgPath: '/_nuxt/assets/images/otp-img',
	imgAlt: 'изображение человек с ноутбуком',
};

const formData = {
	type: 'signin',
	isValid: ref(false),
	headerData: {
		title: 'Enter OTP',
		text: 'Sent OTP on',
		email: formState.email,
		subtitle: '',
		link: '/',
	},
	inputsData: [
		{
			id: '1',
			type: 'text',
			label: 'key number 1',
			name: 'key1',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '2',
			type: 'text',
			label: 'key number 2',
			name: 'key2',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '3',
			type: 'text',
			label: 'key number 3',
			name: 'key3',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '4',
			type: 'text',
			label: 'key number 4',
			name: 'key4',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '5',
			type: 'text',
			label: 'key number 5',
			name: 'key5',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '6',
			type: 'text',
			label: 'key number 6',
			name: 'key6',
			icon: '',
			required: true,
			valid: ref(null),
		},
	],
	footerData: {
		button: 'SUBMIT',
		text: '',
		linkList: [],
	},
};

function checkValidateForm() {
	formData.isValid.value = validRequiredCounter(formData.inputsData);
}

const runValidate = (name, value) => isValidate(name, value);

function sendDataForm(data) {
	formData.inputsData.forEach((input) => {
		if (!isChangeValue(input.name, data[input.name]?.value)) {
			formState[input.name] = data[input.name]?.value;
			if (data[input.name]?.required) {
				input.valid.value = runValidate(input.name, data[input.name].value);
			}
		}
	});
	checkValidateForm();
}
function submit() {
	if (formData.isValid.value) {
		alert('EEEEEEEEEEEEe');
	}
}
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<TheForm
			:form-data="formData"
			@send-data-form="sendDataForm"
			@submit="submit"
		/>
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>It's just OTP verification</template>
			<template #text>
				You are one step away from recovering your password.
			</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
