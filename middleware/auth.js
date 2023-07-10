import { useFormState } from '~/store';
const { getIsAuth } = useFormState();
export default defineNuxtRouteMiddleware((to) => {
	if (to.path === '/otp' && !getIsAuth) {
		return navigateTo('/');
	}
});
