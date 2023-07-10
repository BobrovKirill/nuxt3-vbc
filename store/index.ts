import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFormState = defineStore('stateForm', () => {
	const formState = ref({
		user: '',
		email: '',
		password: '',
		'confirm-password': '',
		check: false,
		key: {},
	});
	const isShowPopup = ref(false);
	const isAuth = ref(false);

	const getIsAuth = computed(() => isAuth.value);
	const getPopupStatus = computed(() => isShowPopup);

	const changeAuthStatus = () => {
		isAuth.value = !isAuth.value;
	};
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
		getIsAuth,
		changeAuthStatus,
	};
});
