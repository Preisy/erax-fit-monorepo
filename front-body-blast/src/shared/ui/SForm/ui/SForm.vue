<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui/SBtn';

export interface SFormProps {
  fieldSchema: TypedSchema;
  action: (data: unknown) => unknown | void;
  loading?: boolean;
}

const props = defineProps<SFormProps>();

const { handleSubmit } = useForm({
  validationSchema: props.fieldSchema,
});

const submitHandler = handleSubmit((data) => {
  props.action(data);
});

defineExpose({
  submitHandler,
});
</script>
<template>
  <form @submit.prevent="" @submit="submitHandler">
    <div flex flex-col gap-y-0.5rem class="s-form-inputs">
      <slot></slot>
    </div>
    <slot name="submit-btn">
      <SBtn :loading="loading" icon="done" type="submit" float-right mt-0.5rem boxshadow-btn />
    </slot>
  </form>
</template>
