import { useFormState } from '~/store';
const { getСonfirmSignupReset, changeСonfirmSignupReset, changeVisiblePopup } =
	useFormState();

export default defineNuxtRouteMiddleware((to, from) => {
	const isFromSignup = to.path === '/' && from.path === '/signup';

	if (isFromSignup) {
		if (!getСonfirmSignupReset.value) {
			changeVisiblePopup();
			return abortNavigation();
		} else {
			changeСonfirmSignupReset();
		}
	}
});
