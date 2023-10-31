<script setup lang="ts">
import { QInput, QInputProps } from 'quasar';
import { useField } from 'vee-validate';
import ErrorMsg from './ErrorMsg.vue';
export interface SInputProps extends Omit<QInputProps, 'modelValue' | 'name' | 'placeholder'> {
  placeholder?: string;
  name: string;
  autocomplete?: string;
  centered?: boolean;
  modelValue?: QInputProps['modelValue'];
}
const props = defineProps<SInputProps>();
const wrapper = ref<HTMLElement>();

const { value, errorMessage, setValue } = useField<string | number | undefined>(() => props.name);
if (props.readonly && props.modelValue) setValue(props.modelValue);
</script>

<template>
  <div
    ref="wrapper"
    bg="primary/50"
    class="s_input [&_.q-field\_\_label]:top-0 [&.centered_.q-field\_\_label]:(left-50% translate-x--50% translate-y--30%) [&_.q-field\_\_bottom]:display-none [&_.q-field]:(h-full pb-0) [&_.q-field\_\_control]:(h-full px-1.25rem py-1rem transition-all-300) [&_.q-field--highlighted_.q-field\_\_control]:(bg-primary) [&.not\_empty]:(bg-primary) [&_.q-placeholder]:p-0 [&.error_.q-field\_\_control]:pb-2rem [&_.q-field--highlighted_.q-placeholder]:pt-0.5rem! [&.not\_empty_.q-placeholder]:pt-0.5rem!"
    relative
    overflow-hidden
    rounded-1rem
    transition-all-300
    :class="{ not_empty: !!value, error: !!errorMessage, centered }"
  >
    <q-input
      v-bind="$props"
      v-model="value"
      standout
      dense
      text-bg
      label-color="bg"
      :input-class="`text-base p-0! ${$props.inputClass}`"
      :bottom-slots="false"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      transition-all-300
    />
    <ErrorMsg absolute bottom-1rem left-1.25rem z-1 v-if="!!errorMessage" :msg="errorMessage" />
  </div>
</template>
