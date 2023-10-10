<script setup lang="ts">
import { QInputProps } from 'quasar';
import { useField } from 'vee-validate';
export interface SInputProps extends QInputProps {
  placeholder?: string;
  name: string
}
const props = defineProps<SInputProps>();

const { value } = useField<string | number | undefined>(
  () => props.name
);
</script>
<template>
  <div
    class="s_input"
    overflow-hidden
  >
    <q-input
      v-bind="{ ...$props }"
      v-model="value"
      standout
      dense
      :placeholder="placeholder"
    />
  </div>
</template>

<style scoped lang="scss">
.s_input {
  &:deep(.q-field__control) {
    --uno: rounded-1rem bg-primary/50 px-1.25rem py-1rem h-auto;
  }
  &:deep(.q-field--highlighted .q-field__control) {
    --uno: bg-primary;
  }
  &:deep(input) {
    --uno: text-bg text-base p-0;
  }
}
</style>
