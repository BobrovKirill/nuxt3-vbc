<script setup lang="ts">
type Props = {
	inputItem: {
		type: string;
		value: string;
	};
};

const props: Props = defineProps({
	inputItem: Object,
});
const emits = defineEmits(['sendValue']);

const input = ref();

onMounted(() => {
	sendEmit(input.value);
});
function inputListener(event: { target: HTMLInputElement }) {
	const target = event.target;
	sendEmit(target);
}
function sendEmit(input) {
	emits('sendValue', {
		name: input.name,
		type: input.type,
		value: input.checked,
		required: input.required,
	});

}
</script>

<template>
	<label class="flex items-center gap-2.5">
		<input
			ref="input"
			class="appearance-none"
			:type="props.inputItem.type"
			:data-invalid="props.inputItem.valid.value"
			:name="props.inputItem.name"
			:required="props.inputItem.required"
			@input="inputListener"
		/>
		<span class="checkbox" />
		<span>
			{{ props.inputItem.label }}
			<a v-for="link in props.inputItem.links" :key="link.id" :href="link.url">
				{{ link.text }}
			</a>
		</span>
	</label>
</template>

<style>
.checkbox {
	@apply h-[20px] w-[20px] rounded border-[2px] border-[#8098F9];
}
input:checked + .checkbox {
	background-position: center;
	background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Property 1=checked'%3E%3Cpath id='Subtract' d='M2.5 0C1.11929 0 0 1.11929 0 2.5V17.5C0 18.8807 1.11929 20 2.5 20H17.5C18.8807 20 20 18.8807 20 17.5V2.5C20 1.11929 18.8807 0 17.5 0H2.5ZM15.0379 6.21209C15.3995 6.57371 15.404 7.15727 15.0512 7.52434L10.061 13.7622C10.0538 13.7712 10.0461 13.7798 10.0379 13.7879C9.67179 14.154 9.0782 14.154 8.71208 13.7879L5.40402 10.4799C5.0379 10.1137 5.0379 9.52015 5.40402 9.15403C5.77014 8.78791 6.36373 8.78791 6.72985 9.15403L9.34674 11.7709L13.6872 6.24013C13.6949 6.23029 13.7032 6.22093 13.7121 6.21209C14.0782 5.84597 14.6718 5.84597 15.0379 6.21209Z' fill='%238098F9'/%3E%3C/g%3E%3C/svg%3E");
}
input[data-invalid='false'] + .checkbox {
	@apply border-red-500;
}
</style>
