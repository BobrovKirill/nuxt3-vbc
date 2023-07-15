<script setup lang="ts">
import { ofetch } from 'ofetch';
import { isValidate, validRequiredCounter } from '~/utils';
import { useFormState } from '~/store';
const { formState, resetState } = useFormState();
definePageMeta({
	middleware: 'otp',
});

const infoData = {
	infoImgPath: '/_nuxt/assets/images/otp-img',
	imgAlt: 'изображение человек с ноутбуком',
};

const formData = {
	type: 'otp',
	isValid: ref(false),
	headerData: {
		title: 'Enter OTP',
		text: 'Sent OTP on',
		email: formState.email,
		subtitle: '',
		link: '/signup',
	},
	inputsData: [
		{
			id: '1',
			type: 'number',
			label: 'key number 1',
			name: 'key1',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '2',
			type: 'number',
			label: 'key number 2',
			name: 'key2',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '3',
			type: 'number',
			label: 'key number 3',
			name: 'key3',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '4',
			type: 'number',
			label: 'key number 4',
			name: 'key4',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '5',
			type: 'number',
			label: 'key number 5',
			name: 'key5',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
		{
			id: '6',
			type: 'number',
			label: 'key number 6',
			name: 'key6',
			placeholder: '-',
			autocomplete: 'off',
			icon: '',
			required: true,
			valid: ref(null),
		},
	],
	footerData: {
		button: 'SUBMIT',
	},
};
function checkValidateForm() {
	formData.isValid.value = validRequiredCounter(formData.inputsData);
}

const runValidate = (name, value) => isValidate(name, value);

function sendDataForm(data) {
	formData.inputsData.forEach((input) => {
		if (data[input.name]?.required) {
			input.valid.value = runValidate(input.name, data[input.name].value);
		}
	});
	formState.key = { ...data };
	checkValidateForm();
}

function getKey(obj): string {
	let result = '';
	for (const key in obj) {
		result += obj[key].value;
	}
	return result;
}
async function submit() {
	if (formData.isValid.value) {
		const url = 'https://dummyjson.com/users/add';
		const form = JSON.stringify({
			email: formState.email,
			key: getKey(formState.key),
		});
		try {
			await ofetch(url, {
				headers: { 'Content-Type': 'application/json' },
				method: 'POST',
				body: form,
			});
			alert('OTP key sent successfully');
			resetState();
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
