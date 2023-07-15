import { useFormState } from '~/store';
const { getConfirmResetSignup, toggleConfirmResetSignup, toggleVisiblePopup } =
	useFormState();

export default defineNuxtRouteMiddleware((to, from) => {
	const isFromSignup = to.path === '/' && from.path === '/signup';

	if (isFromSignup) {
		if (!getConfirmResetSignup.value) {
			toggleVisiblePopup();
			return abortNavigation();
		} else {
			toggleConfirmResetSignup();
		}
	}
});
