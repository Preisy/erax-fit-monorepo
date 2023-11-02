<script lang="ts" setup>
import { computed } from 'vue';

export interface EDietHeaderProps {
  pages: string[];
  modelValue: string;
}
const props = defineProps<EDietHeaderProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();

const currentPageValue = ref(props.modelValue);
watch(currentPageValue, (value: string) => emit('update:modelValue', value));
const currentPageIndex = computed(() => props.pages.indexOf(props.modelValue));
const setPage = (p: string) => (currentPageValue.value = p);
</script>

<template>
  <div grid gap-2 grid-cols="[minmax(40%,_1fr)_min-content_minmax(40%,_1fr)]">
    <div nowrap flex justify-end gap-2 opacity-50>
      <p v-for="page in pages.slice(0, currentPageIndex)" :key="page" @click="setPage(page)" text-right font-semibold>
        {{ $t(`home.diet.header.${page}`) }}
      </p>
    </div>
    <div>
      <p nowrap font-semibold>
        {{ $t(`home.diet.header.${pages[currentPageIndex]}`) }}
      </p>
    </div>
    <div flex gap-2 opacity-50>
      <p nowrap font-semibold v-for="page in pages.slice(currentPageIndex + 1)" :key="page" @click="setPage(page)">
        {{ $t(`home.diet.header.${page}`) }}
      </p>
    </div>
  </div>
</template>
