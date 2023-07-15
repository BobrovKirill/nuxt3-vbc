const isValidate = (name: string, value: string): boolean => {
	if (name === 'email') {
		// return /(?=^.{5,320}$)^([a-z\d_-]+\.)*[a-z\d_-]+@[a-z\d_-]+(\.[a-z\d_-]+)*\.[a-z]{2,6}$/.test(value); - если нужна валидации email
		return value?.length >= 2;
	} else if (name === 'password') {
		// return /(?=^.{8,128}$)^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value); - если нужна валидации пароля
		return value?.length >= 2;
	} else if (name === 'check') {
		return value;
	} else if (name.includes('key')) {
		return value?.length >= 1;
	} else {
		return false;
	}
};
const isRef = (value) => Object.hasOwn(value, '_rawValue');
const validRequiredCounter = (arr) => {
	let requiredCount = 0;
	let validCount = 0;
	arr.forEach((item) => {
		if (isRef(item.valid) ? item.valid.value : item.value) {
			validCount += 1;
		}
		if (item.required) {
			requiredCount += 1;
		}
	});
	return requiredCount === validCount;
};

export { validRequiredCounter, isValidate };
