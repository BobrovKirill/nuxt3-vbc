import { defineStore } from 'pinia';

interface FormState {
	user: string;
	email: string;
	password: string;
	'confirm-password': string;
	check: boolean;
	key: {};
}

export const useFormState = defineStore('stateForm', () => {
	const formState = ref<FormState>({
		user: '',
		email: '',
		password: '',
		'confirm-password': '',
		check: false,
		key: {},
	});

	const isConfirmResetSignup = ref<boolean>(false);
	const isPopupStatus = ref<boolean>(false);
	const isAuth = ref<boolean>(false);

	// getters
	const getIsAuth: ComputedRef = computed((): Ref => isAuth);
	const getPopupStatus: ComputedRef = computed((): Ref => isPopupStatus);
	const getConfirmResetSignup: ComputedRef = computed(
		(): Ref => isConfirmResetSignup,
	);

	// Toggle авторизации
	const toggleAuthStatus = () => {
		isAuth.value = !isAuth.value;
	};

	// Toggle показ попапа
	const toggleVisiblePopup = () => {
		isPopupStatus.value = !isPopupStatus.value;
	};

	// Toggle согласия на редирект
	const toggleConfirmResetSignup = () => {
		isConfirmResetSignup.value = !isConfirmResetSignup.value;
	};

	// Сбрасываем весь стейт
	const resetState = () => {
		formState.value.user = '';
		formState.value.password = '';
		formState.value['confirm-password'] = '';
		formState.value.check = false;
		formState.value.key = {};
	};

	// Сбрасываем пароли
	const resetStatePasswords = () => {
		formState.value.password = '';
		formState.value['confirm-password'] = '';
	};

	// Проверяем обновилось ли значение инпута
	const isChangeValue = (name: string, newValue: string) =>
		formState.value[name] === newValue;

	// Сравнение password и confirm-password
	const isChangePassword = () =>
		formState.value.password === formState.value['confirm-password'];

	return {
		isChangePassword,
		formState,
		isConfirmResetSignup,
		getConfirmResetSignup,
		isChangeValue,
		toggleConfirmResetSignup,
		resetState,
		resetStatePasswords,
		getIsAuth,
		toggleAuthStatus,
		isPopupStatus,
		toggleVisiblePopup,
		getPopupStatus,
	};
});
