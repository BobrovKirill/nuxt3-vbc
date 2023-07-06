import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormState = defineStore('stateForm', () => {
	const formState = ref({
		user: '1',
		email: 'q',
		password: '',
		'confirm-password': '',
		check: false,
		key: '',
	});
	const isChangeValue = (name, newValue) => formState.value[name] === newValue;
	const isChangePassword = () =>
		formState.value.password === formState.value['confirm-password'];

	return { isChangePassword, formState, isChangeValue };
});
