const isValidate = (data): boolean => {
	if (data.type === 'email') {
		return data.values.length >= 2;
	} else if (data.type === 'password') {
		return data.values.length >= 2;
	} else if (data.type === 'confirm-password') {
		return data.values.password === data.values.confirm;
	}
	return false;
};

export { isValidate };
