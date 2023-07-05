const isValidate = (input: HTMLInputElement | undefined): boolean => {
	const name: string = input?.name;
	const value: string = input?.value;
	if (name === 'email') {
		return value?.length >= 2;
	} else if (name === 'password') {
		return value?.length >= 2;
	} else if (name === 'check') {
		return input.checked;
	} else {
		return false;
	}
};

const isConfirmPassword = (password, confirmPassword): boolean =>
	password === confirmPassword;

export { isValidate, isConfirmPassword };
