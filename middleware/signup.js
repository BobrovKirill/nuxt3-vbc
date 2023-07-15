import { useFormState } from '~/store';
const { resetStatePasswords } = useFormState();

export default defineNuxtRouteMiddleware((to, from) => {
	const isFromOtp = to.path === '/signup' && from.path === '/otp';
	if (isFromOtp) {
		resetStatePasswords();
	}
});
