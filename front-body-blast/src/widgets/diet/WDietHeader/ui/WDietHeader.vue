<script lang="ts" setup>
import { SCenteredByChild } from 'shared/ui/SCenteredByChild';

export interface WDietHeaderProps {
  pages: string[];
  modelValue: string;
}
defineProps<WDietHeaderProps>();
const emit = defineEmits<{
  (e: 'update:modelValue', newValue: string): void;
}>();
const setPage = (p: string) => emit('update:modelValue', p);
</script>

<template>
  <SCenteredByChild :gap="2" :model-value="modelValue">
    <p
      v-for="page in pages"
      nowrap
      font-semibold
      :key="page"
      :data-key="page"
      ref="listElements"
      @click="setPage(page)"
      :class="{ 'opacity-50': modelValue !== page }"
    >
      {{ $t(`home.diet.${page}`) }}
    </p>
  </SCenteredByChild>
</template>
