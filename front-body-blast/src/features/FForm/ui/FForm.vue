<script setup lang="ts">
import { TypedSchema, useForm } from 'vee-validate';
import { SInput } from 'shared/ui/SInput';

export interface FFormProps {
  fieldSchema: TypedSchema;
  action: (values: Record<string, unknown>) => void;
}

const props = defineProps<FFormProps>();

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
  <form class="f-form" @submit="submitHandler">
    <div>
      <div
        v-for="({ name, sInputOptions }, index) in fields"
        :key="name"
        class="f-form_input-wrapper"
        :class="{ 'mb-1.1rem!': index === fields.length - 1 }"
        mb-2
      >
        <SInput
          class="f-form_input"
          :class="{ name, inputClasses }"
          :name="name"
          v-bind="sInputOptions"
          resize="none!"
        />
      </div>
    </div>
    <slot name="submitButtonSlot" />
  </form>
</template>
