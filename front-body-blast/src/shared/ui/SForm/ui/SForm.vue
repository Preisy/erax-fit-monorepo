<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SBtn } from 'shared/ui/SBtn';

export interface SFormProps {
  fieldSchema: TypedSchema;
  action: (values: Record<string, unknown>) => void;
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
    <div flex flex-col gap-y-0.5rem>
      <slot></slot>
    </div>
    <slot name="submit-btn">
      <SBtn type="submit" float-right mt-0.5rem boxshadow-btn>
        <q-icon name="done" />
      </SBtn>
    </slot>
  </form>
</template>
