<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui/SBtn';

export interface SFormProps {
  fieldSchema: TypedSchema;
  loading?: boolean;
}

const props = defineProps<SFormProps>();
const { handleSubmit, errors } = useForm({
  validationSchema: props.fieldSchema,
});
const emits = defineEmits<{
  submit: Parameters<Parameters<typeof handleSubmit>[0]>;
}>();
const onsubmit = handleSubmit((...data) => emits('submit', ...data));
</script>

<template>
  <form @submit.prevent="" @submit="onsubmit">
    {{ errors }}
    <div flex flex-col gap-y-0.5rem>
      <slot />
    </div>
    <slot name="submit-btn">
      <SBtn :loading="loading" icon="done" type="submit" float-right mt-0.5rem boxshadow-btn />
    </slot>
  </form>
</template>
