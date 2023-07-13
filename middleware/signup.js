import { useFormState } from '~/store';
const { resetStatePasswords } = useFormState();

export default defineNuxtRouteMiddleware(() => {
	console.log('signup');
	resetStatePasswords();
});
