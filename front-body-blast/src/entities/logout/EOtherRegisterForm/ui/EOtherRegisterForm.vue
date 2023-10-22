<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = () => console.log('aboba');
const schema = toTypedSchema(
  z.object({
    load_restrictions: z.string().min(3).max(50),
    sports_experience: z.string().min(3).max(50),
    targets: z.string().min(3).max(50),
  }),
);
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="load_restrictions" label="Ограничения нагрузки" />
    <SInput name="sports_experience" label="Спортивный опыт" />
    <SInput name="targets" label="Цели" />
  </SForm>
</template>
