<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useField } from 'vee-validate';
export interface SInputProps extends QInputProps {
  placeholder?: string;
  name: string;
}
const props = defineProps<SInputProps>();
const wrapper = ref<InstanceType<typeof HTMLElement>>();

const { value } = useField<string | number | undefined>(() => props.name);
</script>
<template>
  <div ref="wrapper" class="s_input" overflow-hidden>
    <q-input
      v-bind="{ ...$props }"
      v-model="value"
      standout
      dense
      :placeholder="placeholder"
      :class="{ not_empty: !!value }"
    />
  </div>
</template>

<style scoped lang="scss">
.s_input {
  &:deep(.q-field) {
    --uno: pb-0;
  }
  &:deep(.q-field__bottom) {
    --uno: display-none;
  }

  &:deep(.q-field__control) {
    --uno: rounded-1rem bg-primary/50 px-1.25rem py-1rem h-auto;
  }
  &:deep(.q-field--highlighted .q-field__control),
  &:deep(.not_empty .q-field__control) {
    --uno: bg-primary;
  }

  &:deep(.q-placeholder) {
    --uno: p-0;
  }
  &:deep(.not_empty .q-placeholder) {
    --uno: pt-0.5rem;
  }

  &:deep(.q-field__label) {
    --uno: top-0 text-bg;
  }

  &:deep(input) {
    --uno: text-bg text-base p-0;
  }
}
</style>
