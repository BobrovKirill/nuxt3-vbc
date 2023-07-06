<script setup lang="ts">
import TheInput from '~/components/UI/TheInput.vue';
import { useFormState } from '~/store';
import { isConfirmPassword, isValidate } from '~/utils';
import TheCheckbox from '~/components/UI/TheCheckbox.vue';

const props = defineProps({
	inputsData: Object,
});
const emits = defineEmits(['isValidForm']);

const validInputSet = new Set();
let requiredInputLength = 0;
const inputs = ref();

const inputList = props.inputsData.inputList.filter(
	(input) => input.type !== 'checkbox',
);
const checkboxList = props.inputsData.inputList.filter(
	(input) => input.type === 'checkbox',
);

onMounted(() => {
	const inputList = inputs.value.querySelectorAll('input[required]');
	requiredInputLength = inputList.length;
});

const formState = useFormState();

function valid(name) {
	validInputSet.add(name);
}

function invalid(name) {
	validInputSet.delete(name);
}

function checkConfirmPassword(password) {
	const confirmPassword = formState.form['confirm-password'];
	const passwordMatching = isConfirmPassword(password, confirmPassword);
	if (confirmPassword.length) {
		passwordMatching ? valid('confirm-password') : invalid('confirm-password');
	}
}
function validatePasswords(input) {
	if (input.name === 'password') {
		checkConfirmPassword(input.value);
		return isValidate(input);
	} else {
		const passowrd = formState.form.password;
		return checkConfirmPassword(passowrd);
	}
}
function checkValidForm() {
	console.log(formState.form);
	console.log('finish', isValidForm());
	emits('isValidForm', isValidForm());
}
function validateInput(input) {
	formState.form[input.name] = input.value;

	const hasValidate = input.name.includes('password')
		? validatePasswords(input)
		: isValidate(input);

	if (hasValidate) {
		valid(input.name);
	} else {
		invalid(input.name);
	}

	checkValidForm();
}

function getValue(input) {
	if (input.required) {
		validateInput(input);
	} else {
		formState.form[input.name] = input.value;
	}
	checkValidForm();
}

const isValidForm = () => requiredInputLength === validInputSet.size;
</script>

<template>
	<div ref="inputs" class="flex w-full flex-col items-center gap-2.5">
		<TheInput
			v-for="inputItem in inputList"
			:key="inputItem.key"
			:input-item="inputItem"
			@send-value="getValue"
		/>
		<TheCheckbox
			v-for="inputItem in checkboxList"
			:key="inputItem.key"
			:input-item="inputItem"
			@send-value="getValue"
		/>
	</div>
</template>

<style></style>
