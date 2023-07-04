const isValidate = (input: {
	name: string;
	value: string | boolean;
}): boolean => {
	const name: string = input.name;
	const value: string | boolean = input.value;
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
