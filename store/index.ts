import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormState = defineStore('formState', () => {
	const form = ref({
		user: '',
		email: '',
		password: '',
		'confirm-password': '',
		check: '',
	});

	return { form };
});
