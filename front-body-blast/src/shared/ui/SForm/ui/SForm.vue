<script setup lang="ts">
import { SubmissionContext, TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui/SBtn';

export interface SFormProps {
  fieldSchema: TypedSchema;
  loading?: boolean;
}

const props = defineProps<SFormProps>();
const { handleSubmit } = useForm({
  validationSchema: props.fieldSchema,
});
const emits = defineEmits<{
  (e: 'submit', values: unknown, ctx: SubmissionContext): void;
}>();
const onsubmit = handleSubmit((...data) => emits('submit', ...data));
</script>

<template>
  <form @submit.prevent="" @submit="onsubmit">
    <div flex flex-col gap-y-0.5rem>
      <slot></slot>
    </div>
    <slot name="submit-btn">
      <SBtn :loading="loading" icon="done" type="submit" float-right mt-0.5rem boxshadow-btn />
    </slot>
  </form>
</template>
