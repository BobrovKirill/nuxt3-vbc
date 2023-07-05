<script setup lang="ts">
import TheInput from '~/components/UI/TheInput.vue';
import { useFormState } from '~/store';
import { isConfirmPassword, isValidate } from '~/utils';
import TheCheckbox from '~/components/UI/TheCheckbox.vue';

const props = defineProps({
	inputsData: Object,
});
const emits = defineEmits(['isValidForm']);

const validInputList = new Set();
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
function validatePasswords(input) {
	if (input.name === 'password') {
		const confirmPassword = formState.form.confirmPassword;
		if (confirmPassword?.length) {
			validateInput({ name: 'confirm-password', value: confirmPassword });
		}
		return isValidate(input);
	} else {
		return isConfirmPassword(formState.form.password, input.value);
	}
}
function validateInput(input) {
	formState.form[input.name] = input.value;

	const hasValidate = input.name.includes('password')
		? validatePasswords(input)
		: isValidate(input);

	if (hasValidate) {
		validInputList.add(input.name);
		input.removeAttribute('data-invalid');
	} else {
		validInputList.delete(input.name);
		input.setAttribute('data-invalid', '');
	}
}

function checkValidForm() {
	console.log(formState.form);
	console.log(requiredInputLength, ' ??', validInputList.size);
	console.log('finish', isValidForm());
	emits('isValidForm', isValidForm());
}
function getValue(input) {
	if (input.required) {
		validateInput(input);
	} else {
		formState.form[input.name] = input.value;
	}
	checkValidForm();
}

const isValidForm = () => requiredInputLength === validInputList.size;
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
