<script setup lang="ts">
import { useFormState } from '~/store';
import { validRequiredCounter, isValidate } from '~/utils';
const { formState, isChangeValue, isChangePassword } = useFormState();

const infoData = {
	infoImgPath: '/_nuxt/assets/images/signup-img',
	imgAlt: 'изображение связей',
};
const formData = {
	type: 'signup',
	isValid: ref(false),
	headerData: {
		type: 'signup',
		title: 'Create your account',
		text: 'Unlock all Features!',
		subtitle: '',
	},
	inputsData: [
		{
			id: '1',
			type: 'text',
			label: 'user name',
			name: 'user',
			icon: 'user',
			required: false,
			valid: ref(null),
		},
		{
			id: '2',
			type: 'text',
			label: 'email',
			name: 'email',
			icon: 'email',
			required: true,
			valid: ref(null),
		},
		{
			id: '3',
			type: 'password',
			label: 'password',
			name: 'password',
			icon: 'password',
			required: true,
			valid: ref(null),
		},
		{
			id: '4',
			type: 'password',
			label: 'confirm-password',
			name: 'confirm-password',
			icon: 'password',
			required: true,
			valid: ref(null),
		},
		{
			id: '5',
			type: 'checkbox',
			label: 'Accept',
			links: [{ id: '1', url: '#', text: 'terms and conditions' }],
			name: 'check',
			icon: '',
			required: true,
			valid: ref(null),
		},
	],
	footerData: {
		button: 'sign up',
		text: 'You have account? ',
		linkList: [{ id: '1', url: '/', text: 'Login now' }],
	},
};

function checkValidateForm() {
	formData.isValid.value = validRequiredCounter(formData.inputsData);
}
function validatePasswords(name, value) {
	if (name === 'confirm-password') {
		return isChangePassword();
	} else {
		if (formState['confirm-password']) {
			const confirmPassword = formData.inputsData.find(
				(item) => item.name === 'confirm-password',
			);
			confirmPassword.valid.value = isChangePassword();
		}
		return isValidate(name, value);
	}
}
function runValidate(name, value) {
	const isPasswordType = name.includes('password');
	if (isPasswordType) {
		return validatePasswords(name, value);
	} else {
		return isValidate(name, value);
	}
}
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
			<template #title>Join us!</template>
			<template #text>
				Just go through the boring process of creating an account.
			</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
