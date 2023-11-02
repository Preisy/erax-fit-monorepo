<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
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
  submit: Parameters<Parameters<typeof handleSubmit>[0]>;
}>();
defineExpose({
  handleSubmit,
});

const onsubmit = handleSubmit((...data) => emits('submit', ...data));
</script>

<template>
  <form @submit.prevent="" @submit="onsubmit" flex flex-col>
    <div flex flex-col gap-y-0.5rem class="s-form-inputs">
      <slot />
    </div>
    <slot name="submit-btn">
      <SBtn :loading="loading" icon="done" type="submit" mt-0.5rem self-end />
    </slot>
  </form>
</template>
