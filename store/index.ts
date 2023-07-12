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
	const isСonfirmSignupReset = ref(true);
	const isPopupStatus = ref(false);
	const isAuth = ref(false);

	const getIsAuth = computed(() => isAuth.value);
	const getPopupStatus = computed(() => isPopupStatus);
	const getСonfirmSignupReset = computed(() => isСonfirmSignupReset);

	const changeAuthStatus = () => {
		isAuth.value = !isAuth.value;
	};
	const changeVisiblePopup = () => {
		isPopupStatus.value = !isPopupStatus.value;
	};
	const changeСonfirmSignupReset = () => {
		isСonfirmSignupReset.value = !isСonfirmSignupReset.value;
	};
	const resetState = () => {
		formState.value.user = '';
		formState.value.password = '';
		formState.value['confirm-password'] = '';
		formState.value.check = false;
		formState.value.key = {};
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
		isСonfirmSignupReset,
		getСonfirmSignupReset,
		isChangeValue,
		changeСonfirmSignupReset,
		resetState,
		resetStatePasswords,
		getIsAuth,
		changeAuthStatus,
		isPopupStatus,
		changeVisiblePopup,
		getPopupStatus,
	};
});
