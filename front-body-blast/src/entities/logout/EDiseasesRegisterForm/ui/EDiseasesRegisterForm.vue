<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = () => console.log('aboba');
const schema = toTypedSchema(
  z.object({
    gastrointestinal_diseases: z.string().min(3).max(50),
    insulin_resistance: z.string().min(3).max(50),
    kidney_disease: z.string().min(3).max(50),
    CVD_disease: z.string().min(3).max(50),
    ODA_disease: z.string().min(3).max(50),
  }),
);
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="gastrointestinal_diseases" label="Имя и фамилия" />
    <SInput name="insulin_resistance" label="Инсулинрезистентность" />
    <SInput name="kidney_disease" label="Заболевания почек" />
    <SInput name="CVD_disease" label="Заболевания ССС" />
    <SInput name="ODA_disease" label="Заболевания ОДП" />
  </SForm>
</template>
