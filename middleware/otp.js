import { useFormState } from '~/store';
const { getIsAuth } = useFormState();

export default defineNuxtRouteMiddleware((to) => {
	console.log('otp');
	if (to.path === '/otp' && !getIsAuth) {
		return navigateTo('/');
	}
});
