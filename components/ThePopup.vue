<script setup lang="ts">
const props = defineProps({
	isShowPopup: Boolean,
});
const emits = defineEmits(['popupAnswer']);

function choiceYes() {
	emits('popupAnswer', true);
}
function choiceNo() {
	emits('popupAnswer', false);
}

console.log(props.isShowPopup);
</script>

<template>
	<div
		v-if="props.isShowPopup"
		class="fixed z-50 flex h-screen w-screen items-center justify-center bg-black/[0.8] p-4"
	>
		<div
			class="grid h-[200px] w-full max-w-[550px] grid-cols-2 gap-2 rounded-[10px] bg-white p-8"
		>
			<p class="col-span-2">
				В случае перехода на страницу авторизации данные из формы регистрации
				будут утеряны
			</p>
			<button
				class="rounded-[10px] bg-[#8098F9] p-2.5 font-inter text-xl text-[#ffffff]"
				@click="choiceYes"
			>
				ок
			</button>
			<button
				class="rounded-[10px] bg-[#8098F9] p-2.5 font-inter text-xl text-[#ffffff]"
				@click="choiceNo"
			>
				нет
			</button>
		</div>
	</div>
</template>

<style></style>
