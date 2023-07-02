const isValidate = (input): boolean => {
	const type = input.type;
	// const value = input.value;
	if (type === 'email') {
		return true;
		// eslint-disable-next-line sonarjs/no-duplicated-branches
	} else if (type === 'password') {
		return true;
	}
	return false;
};

export { isValidate };
