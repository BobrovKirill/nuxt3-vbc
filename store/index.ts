import { defineStore } from 'pinia';
import { ref } from 'vue';
interface FormState {
	user: string;
	email: string;
	password: string;
	'confirm-password': string;
	check: boolean;
	key: {};
}

export const useFormState = defineStore('stateForm', () => {
	const formState: FormState = ref({
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
	const getIsAuth = computed(() => isAuth);
	const getPopupStatus = computed(() => isPopupStatus);
	const getConfirmResetSignup = computed(() => isConfirmResetSignup);

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
	const isChangeValue = (name, newValue) => formState.value[name] === newValue;

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
