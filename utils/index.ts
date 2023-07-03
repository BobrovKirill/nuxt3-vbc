const isValidate = (input): boolean => {
	const name = input.name;
	const value = input.value;
	if (name === 'email') {
		return value.length >= 2;
	} else if (name === 'password') {
		return value.length >= 2;
	} else {
		return true;
	}
};

const isConfirmPassword = (password, confirmPassword): boolean => {
	return password === confirmPassword;
};

export { isValidate, isConfirmPassword };
