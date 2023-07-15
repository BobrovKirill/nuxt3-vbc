<script setup lang="ts">
type Props = {
	inputItem: {
		label: string;
		type: string;
		value: string;
	};
};

const props: Props = defineProps({
	inputItem: Object,
});
const emits = defineEmits(['sendValue']);
const keyInput = ref(null);
const nextKeyInput = ref(null);

function sendEmit(input) {
	const name = input.name;
	const type = input.type;
	const value = input.value;
	const required = input.required;
	emits('sendValue', { name, type, value, required });
}
function inputListener(event: { target: HTMLInputElement }) {
	const target = event.target;
	sendEmit(target);
}
const keyValue = ref('');
watch(keyValue, (newValue, oldValue) => {
	if (oldValue === '') {
		keyValue.value = newValue;
	} else {
		keyValue.value = newValue.at(-1);
	}
	keyInput.value.querySelector('input').blur();
	nextKeyInput.value.querySelector('input').focus();
});
onMounted(() => {
	nextKeyInput.value = keyInput.value.nextElementSibling;
});
</script>

<template>
	<div ref="keyInput" class="label">
		<label class="sr-only" :for="props.inputItem.name">
			{{ props.inputItem.label }}
		</label>
		<input
			:id="props.inputItem.name"
			v-model="keyValue"
			class="input"
			:type="inputType"
			:data-invalid="props.inputItem.valid.value"
			:name="props.inputItem.name"
			:required="props.inputItem.required"
			:autocomplete="props.inputItem.autocomplete"
			:placeholder="props.inputItem.placeholder"
			@input="inputListener"
		/>
	</div>
</template>

<style>
.label {
	@apply relative h-[64px] w-full;
}
.input {
	@apply h-full w-full rounded-[10px] border-2 border-[#8098f9]/50 bg-[#8098f9]/10 p-2.5;
	@apply font-inter text-lg/[24px] text-[#206D93] placeholder:text-[#2d31a6]/20;
}
.input[data-invalid='false'] {
	@apply border-red-500;
}
input:-webkit-autofill {
	-webkit-text-fill-color: #2d63b2 !important;
}
.icon {
	@apply absolute left-2.5 top-1/2 z-10 h-[30px] w-[30px] -translate-y-2/4;
}
.icon + input {
	@apply pl-[50px];
}
.eye {
	@apply absolute right-0 top-0 z-10 h-full w-[50px];
}
</style>
