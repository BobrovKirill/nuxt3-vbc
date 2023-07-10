<script setup lang="ts">
import { ofetch } from 'ofetch';
import { isValidate, validRequiredCounter } from '~/utils';
import { useFormState } from '~/store';
const { formState, isChangeValue, changeAuthStatus } = useFormState();

const infoData = {
	infoImgPath: '/_nuxt/assets/images/login-img',
	imgAlt: 'изображение гаджетов',
};

const formData = {
	type: 'signin',
	isValid: ref(false),
	headerData: {
		title: 'Login to your Account',
		subtitle: 'with email',
	},
	inputsData: [
		{
			id: '1',
			type: 'text',
			label: 'email',
			name: 'email',
			placeholder: 'Email',
			icon: 'email',
			required: true,
			valid: ref(null),
		},
		{
			id: '2',
			type: 'password',
			label: 'password',
			name: 'password',
			placeholder: 'Password',
			icon: 'password',
			required: true,
			valid: ref(null),
		},
	],
	footerData: {
		button: 'log in',
		text: 'Don’t have account?',
		link: { id: '1', url: '/signup', text: 'Create an account' },
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
async function submit() {
	if (formData.isValid.value) {
		const url = 'https://dummyjson.com/auth/login';
		const email = formState.email;
		const password = formState.password;
		const form = JSON.stringify({
			email,
			password,
		});
		console.log(form);
		const responses = await ofetch(url, {
			method: 'POST',
			body: form,
		});
		console.log('responses', responses);
		changeAuthStatus();
		navigateTo('/otp');
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
			<template #title>Connect with any device.</template>
			<template #text>Everything you need is an internet connection.</template>
		</TheInfo>
	</div>
</template>

<style scoped></style>
