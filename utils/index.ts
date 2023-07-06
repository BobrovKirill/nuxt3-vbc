const isValidate = (name, value): boolean => {
	if (name === 'email') {
		return value?.length >= 2;
	} else if (name === 'password') {
		return value?.length >= 2;
	} else if (name === 'check') {
		return value;
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
