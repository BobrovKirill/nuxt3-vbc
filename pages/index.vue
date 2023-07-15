<script setup lang="ts">
import { ofetch } from 'ofetch';
import { isValidate, validRequiredCounter } from '~/utils';
import { useFormState } from '~/store';
const { formState, isChangeValue, toggleAuthStatus } = useFormState();

// регистрируем middleware
definePageMeta({
	middleware: 'signin',
});

// Данные страницы signin
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
			autocomplete: 'email',
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
			autocomplete: 'current-password',
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

// прокидываем props и emits
provide('formData', { formData, onSubmit, sendDataForm });

// Проверяем валидна ли форма, то есть валидны ли все required инпуты
function checkValidateForm() {
	formData.isValid.value = validRequiredCounter(formData.inputsData);
}

// валидируем инпут
const runValidate = (name, value) => isValidate(name, value);

// принимаем инпут записываем в стейт его новое значение если оно изменилось если поле required, то отправляем на валидацию.
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

// если response ok, обновляем email из response'a и редиректим
function toRedirect(response) {
	formState.email = response.email;
	toggleAuthStatus();
	navigateTo('/otp');
}

// fetch запрос - для теста -> username: kminchelle / password: 0lelplR
async function onSubmit() {
	if (formData.isValid.value) {
		const url = 'https://dummyjson.com/auth/login';
		// const username = formState.email;
		// const password = formState.password;
		const form = JSON.stringify({
			username: 'kminchelle',
			password: '0lelplR',
		});
		try {
			const response = await ofetch(url, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: form,
			});
			toRedirect(response);
		} catch (err) {
			console.log('error ->', err);
		}
	}
}
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<TheForm />
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>Connect with any device.</template>
			<template #text>Everything you need is an internet connection.</template>
		</TheInfo>
	</div>
</template>

<style></style>
