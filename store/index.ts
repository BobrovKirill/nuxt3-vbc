import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormState = defineStore('stateForm', () => {
	const formState = ref({
		user: '',
		email: 'xxxxxx@mail.com',
		password: '',
		'confirm-password': '',
		check: false,
		key: {},
	});
	const isShowPopup = ref(false);

	const getPopupStatus = computed(() => {
		return isShowPopup;
	});
	const changeVisiblePopup = () => {
		isShowPopup.value = !isShowPopup.value;
	};
	const resetState = () => {
		formState.value.user = '';
		formState.value.password = '';
		formState.value['confirm-password'] = '';
		formState.value.check = false;
	};
	const resetStatePasswords = () => {
		formState.value.password = '';
		formState.value['confirm-password'] = '';
	};
	const isChangeValue = (name, newValue) => formState.value[name] === newValue;
	const isChangePassword = () =>
		formState.value.password === formState.value['confirm-password'];

	return {
		isChangePassword,
		formState,
		isShowPopup,
		changeVisiblePopup,
		isChangeValue,
		getPopupStatus,
		resetState,
		resetStatePasswords,
	};
});
