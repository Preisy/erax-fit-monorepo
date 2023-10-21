<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useField } from 'vee-validate';
export interface SInputProps extends Omit<QInputProps, 'modelValue' | 'name' | 'placeholder'> {
  placeholder?: string;
  name: string;
  autocomplete?: string;
}
const props = defineProps<SInputProps>();
const wrapper = ref<HTMLElement>();

const { value } = useField<string | number | undefined>(() => props.name);
</script>
<template>
  <div
    ref="wrapper"
    class="s_input [&_.q-field\_\_label]:(top-0 text-bg) [&_.q-field\_\_bottom]:display-none [&_.q-field\_\_control]:(h-auto rounded-1rem bg-primary/50 px-1.25rem py-1rem) [&_.not\_empty_.q-field\_\_control]:(bg-primary) [&_.q-field--highlighted_.q-field\_\_control]:(bg-primary) [&_.q-placeholder]:p-0 [&_.q-field]:pb-0 [&_input]:(p-0! text-base! text-bg!) [&_.not\_empty_.q-placeholder]:pt-0.5rem!"
    overflow-hidden
  >
    <q-input
      v-bind="{ ...$props }"
      v-model="value"
      standout
      dense
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :class="{ not_empty: !!value }"
    />
  </div>
</template>
