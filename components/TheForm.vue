<script setup lang="ts">
import FormInputs from '~/components/FormInputs.vue';
import FormHeader from '~/components/FormHeader.vue';
import FormFooter from '~/components/FormFooter.vue';

const props = defineProps({
	formData: Object,
});

const isValid = ref<boolean>(false);
const isValidForm = (status: boolean) => (isValid.value = status);
function submit() {
	if (isValid.value) {
		console.log('emit work!');
	}
}
</script>

<template>
	<div class="flex items-center justify-center bg-white p-4">
		<form
			action="#"
			class="flex w-full max-w-[477px] flex-col items-center gap-[25px]"
		>
			<FormHeader :header-data="props.formData.headerData" />
			<FormInputs
				:inputs-data="props.formData.inputsData"
				@is-valid-form="isValidForm"
			/>
			<FormFooter
				:footer-data="props.formData.footerData"
				:is-valid="isValid"
				@submit="submit"
			/>
		</form>
	</div>
</template>

<style></style>
