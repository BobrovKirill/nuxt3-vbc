<script setup lang="ts">
import FormInputs from '~/components/InputsForm.vue';
import FormHeader from '~/components/FormHeader.vue';
import FormFooter from '~/components/FormFooter.vue';

const formData = {
	headerData: {
		type: 'login',
		title: 'Login to your Account',
		subtitle: 'with email',
	},
	footerData: {
		button: 'log in',
		text: 'You have account?',
		linkList: [{ id: '1', url: '/signup', text: 'Create an account' }],
	},
	inputsData: {
		type: 'login',
		inputList: [
			{ id: '1', type: 'text', label: 'email', name: 'email', icon: 'email' },
			{
				id: '2',
				type: 'password',
				label: 'password',
				name: 'password',
				icon: 'password',
			},
		],
	},
};

function submit() {
	console.log('emit work!');
}
</script>

<template>
	<div class="flex items-center justify-center bg-white p-4">
		<form
			action="#"
			class="flex w-full max-w-[477px] flex-col items-center gap-[25px]"
		>
			<FormHeader :header-data="formData.headerData" />
			<FormInputs :inputs-data="formData.inputsData" />
			<FormFooter :footer-data="formData.footerData" @submit="submit" />
		</form>
	</div>
</template>

<style></style>
