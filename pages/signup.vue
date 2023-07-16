<script setup lang="ts">
import { ofetch } from 'ofetch';
import { useFormState } from '~/store';
import { validRequiredCounter, isValidate } from '~/utils';
import ThePopup from '~/components/ThePopup.vue';
const {
	formState,
	isChangeValue,
	isChangePassword,
	toggleVisiblePopup,
	getPopupStatus,
	resetState,
	toggleConfirmResetSignup,
} = useFormState();

// регистрируем middleware
definePageMeta({
	middleware: 'signup',
});

// Данные страницы signup
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
			id: 1,
			type: 'text',
			label: 'user name',
			name: 'user',
			placeholder: 'User name',
			autocomplete: 'username',
			icon: 'user',
			required: false,
			valid: ref(null),
		},
		{
			id: 2,
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
			id: 3,
			type: 'password',
			label: 'password',
			name: 'password',
			placeholder: 'Password',
			autocomplete: 'off',
			icon: 'password',
			required: true,
			valid: ref(null),
		},
		{
			id: 4,
			type: 'password',
			label: 'confirm-password',
			name: 'confirm-password',
			placeholder: 'Confirm Password',
			autocomplete: 'off',
			icon: 'password',
			required: true,
			valid: ref(null),
		},
		{
			id: 5,
			type: 'checkbox',
			label: 'Accept',
			links: [{ id: 1, url: '#', text: 'terms and conditions' }],
			name: 'check',
			icon: '',
			required: true,
			valid: ref(null),
		},
	],
	footerData: {
		button: 'sign up',
		text: 'You have account? ',
		link: { id: 1, url: '/', text: 'Login now' },
	},
};

// Валидируем пароль и подтвердите пароль, в случае если был изменен пароль и то повторно проверяем и валидацию повторите пароль
function validatePasswords(name: string, value: string) {
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

// делим инпуты пароль или подтвердите пароль от других
function runValidate(name: string, value: string) {
	const isPasswordType = name.includes('password');
	if (isPasswordType) {
		return validatePasswords(name, value);
	} else {
		return isValidate(name, value);
	}
}

// Принимаем инпут записываем в стейт его новое значение если оно изменилось если поле required, то отправляем на валидацию.
// Проверяем валидна ли форма, то есть валидны ли все required инпуты
function sendDataForm(data: { name: string; required: string; value: string }) {
	formData.inputsData.forEach((input) => {
		if (!isChangeValue(input.name, data[input.name]?.value)) {
			formState[input.name] = data[input.name]?.value;
			if (data[input.name]?.required) {
				input.valid.value = runValidate(input.name, data[input.name].value);
			}
		}
	});
	formData.isValid.value = validRequiredCounter(formData.inputsData);
}

function toRedirect(response) {
	formState.email = response.email;
	navigateTo('/otp');
}

// fetch запрос
async function onSubmit() {
	if (formData.isValid.value) {
		const url = 'https://dummyjson.com/users/add';
		const form = JSON.stringify({
			username: formState.user,
			email: formState.email,
			password: formState.password,
			check: formState.check,
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

// Показываем попап
function showPopup() {
	changeVisiblePopup();
}

// Ждем подтверждения от попапа и редиректим или просто закрываем его
function popupAnswer(answer) {
	if (answer) {
		resetState();
		toggleConfirmResetSignup();
		toggleVisiblePopup();
		navigateTo('/');
	} else {
		toggleVisiblePopup();
	}
}

// прокидываем props и emits
provide('formData', { formData, onSubmit, sendDataForm, showPopup });
</script>

<template>
	<div
		class="grid-rows-[1fr, auto] grid h-full grid-cols-1 xl:grid-cols-2 xl:grid-rows-1"
	>
		<TheForm />
		<TheInfo :img-src="infoData.infoImgPath" :img-alt="infoData.imgAlt">
			<template #title>Join us!</template>
			<template #text>
				Just go through the boring process of creating an account.
			</template>
		</TheInfo>
		<ThePopup :is-show-popup="getPopupStatus" @popup-answer="popupAnswer" />
	</div>
</template>

<style scoped></style>
