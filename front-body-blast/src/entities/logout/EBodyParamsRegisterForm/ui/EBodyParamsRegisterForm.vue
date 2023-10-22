<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = () => console.log('aboba');
const schema = toTypedSchema(
  z.object({
    age: z.string().max(3),
    weight: z.string().max(3),
    teen_age_weight: z.string().max(3),
  }),
);
</script>

<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="age" label="Возраст" />
    <SInput name="weight" label="Вес" />
    <SInput name="teen_age_weight" label="Вес в подростковом возрасте" />
  </SForm>
</template>
