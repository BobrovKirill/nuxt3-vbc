import { useFormState } from '~/store';
const { getСonfirmSignupReset, changeVisiblePopup } = useFormState();

export default defineNuxtRouteMiddleware((to, from) => {
	const isFromSignup = to.path === '/' && from.path === '/signup';

	if (isFromSignup && !getСonfirmSignupReset) {
		changeVisiblePopup();
		return abortNavigation();
	}
});
