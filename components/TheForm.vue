<script setup lang="ts">
import FormHeader from '~/components/FormHeader.vue';
import FormFooter from '~/components/FormFooter.vue';
import TheInput from '~/components/UI/TheInput.vue';
import TheCheckbox from '~/components/UI/TheCheckbox.vue';

const props = defineProps({
	formData: Object,
});
const emits = defineEmits(['sendDataForm', 'submitEmit', 'showPopup']);
// TODO переделать на Map
const result = {};

const inputList = props.formData.inputsData.filter(
	(input) => input.type !== 'checkbox',
);
const checkboxList = props.formData.inputsData.filter(
	(input) => input.type === 'checkbox',
);
function getValue(data) {
	const { name, type, value, required } = data;
	result[name] = { type, value, required };
	emits('sendDataForm', result);
}
function onSubmit(e) {
	console.log(e);
	emits('submitEmit');
}
function showPopup() {
	emits('showPopup');
}
</script>

<template>
	<div class="flex items-center justify-center bg-white p-4">
		<form
			action="#"
			class="flex w-full max-w-[477px] flex-col items-center gap-[25px]"
			@submit.prevent="onSubmit"
		>
			<FormHeader :header-data="props.formData.headerData" />
			<fieldset
				ref="inputs"
				class="grid w-full justify-center"
				:class="
					props.formData.type === 'otp'
						? 'otp-inputs  grid-cols-6 gap-x-5'
						: 'grid-cols-[453px] gap-y-2.5'
				"
			>
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
			</fieldset>
			<FormFooter
				:footer-data="props.formData.footerData"
				:is-valid="props.formData.isValid.value"
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
