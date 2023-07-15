<script setup lang="ts">
import FormHeader from '~/components/FormHeader.vue';
import FormFooter from '~/components/FormFooter.vue';
import TheInput from '~/components/UI/TheInput.vue';
import TheCheckbox from '~/components/UI/TheCheckbox.vue';
import TheKeyInput from '~/components/UI/TheKeyInput.vue';

const { formData, onSubmit, sendDataForm, showPopup } = inject('formData');
// TODO переделать на Map
const result = {};

const inputList = formData.inputsData.filter(
	(input) => input.type !== 'checkbox' && input.type !== 'number',
);
const checkboxList = formData.inputsData.filter(
	(input) => input.type === 'checkbox',
);
const keysList = formData.inputsData.filter((input) => {
	return input.type === 'number';
});
function getValue(data) {
	const { name, type, value, required } = data;
	result[name] = { type, value, required };
	sendDataForm(result);
}
</script>

<template>
	<div class="flex items-center justify-center bg-white p-4">
		<form
			action="#"
			class="flex w-full flex-col items-center gap-[25px]"
			:class="formData.type === 'otp' ? 'max-w-[484px]' : 'max-w-[477px]'"
			@submit.prevent="onSubmit"
		>
			<FormHeader :header-data="formData.headerData" />
			<fieldset
				ref="inputs"
				class="grid w-full justify-center"
				:class="
					formData.type === 'otp'
						? 'otp-inputs grid-cols-6 gap-x-5'
						: 'grid-cols-[453px] gap-y-2.5'
				"
			>
				<TheInput
					v-for="inputItem in inputList"
					:key="inputItem.id"
					:input-item="inputItem"
					@send-value="getValue"
				/>
				<TheCheckbox
					v-for="inputItem in checkboxList"
					:key="inputItem.id"
					:input-item="inputItem"
					@send-value="getValue"
				/>
				<TheKeyInput
					v-for="keyInput in keysList"
					:key="keyInput.id"
					:input-item="keyInput"
					@send-value="getValue"
				/>
			</fieldset>
			<FormFooter
				:footer-data="formData.footerData"
				:is-valid="formData.isValid.value"
				@show-popup="showPopup"
			/>
		</form>
	</div>
</template>

<style>
.otp-inputs input {
	@apply text-center text-[32px]/[24px];
}
</style>
