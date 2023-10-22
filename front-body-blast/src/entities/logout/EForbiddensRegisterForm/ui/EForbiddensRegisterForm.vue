<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = () => console.log('aboba');
const schema = toTypedSchema(
  z.object({
    diet_forbiddens: z.string().min(3).max(50),
    allergic: z.string().min(3).max(50),
    diet_intolerance: z.string().min(3).max(30),
  }),
);
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="diet_forbiddens" label="Запреты в питании" />
    <SInput name="allergic" label="Аллергии" />
    <SInput name="diet_intolerance" label="Непереносимость продуктов" />
  </SForm>
</template>
