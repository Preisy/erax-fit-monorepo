<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { SInput } from 'shared/ui/SInput';
import { FieldsSchema } from '../model'


const props = withDefaults(
  defineProps<{
    fields: FieldsSchema;
    inputClasses?: string;
    action: (values: Record<string, unknown>) => void;
  }>(),
  { inputClasses: '' }
);

const validationSchema = toTypedSchema(
  z.object(
    props.fields.reduce(
      (all, currentField) => ({
        ...all,
        [currentField.name]: currentField.rule
      }),
      {}
    )
  )
);

const { handleSubmit } = useForm({
  validationSchema
});

const onSubmit = handleSubmit((data) => {
  props.action(data);
});
const a = ref();
</script>

<template>
  <form
    class="f-form"
    @submit="onSubmit"
  >
    <div>
      <div
        v-for="({ name, title, sInputOptions }, index) in fields"
        :key="name"
        class="f-form_input-wrapper"
        :class="{ 'mb-1.1rem!': index === fields.length - 1 }"
        mb-2
      >
        <SInput
          class="f-form_input"
          :class="{name, inputClasses}"
          :name="name"
          :title="title"
          v-model="a"
          v-bind="sInputOptions"
          resize="none!"
        />
      </div>
    </div>
    <slot name="submitButtonSlot" />
  </form>
</template>
