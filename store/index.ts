import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormState = defineStore('formState', () => {
	const form = ref({
		user: '',
		email: '',
		value: '',
		password: '',
		'confirm-password': '',
		check: false,
	});

	return { form };
});
