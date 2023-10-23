<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { DiseasesDto } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const schema = toTypedSchema(DiseasesDto.validation());
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="gastrointestinalDiseases" :label="$t('logout.signUp.diseases.fields.gastrointestinalDiseases')" />
    <SInput name="insulinResistance" :label="$t('logout.signUp.diseases.fields.insulinResistance')" />
    <SInput name="kidneyDisease" :label="$t('logout.signUp.diseases.fields.kidneyDisease')" />
    <SInput name="diseasesCVD" :label="$t('logout.signUp.diseases.fields.diseasesCVD')" />
    <SInput name="diseasesODA" :label="$t('logout.signUp.diseases.fields.diseasesODA')" />
  </SForm>
</template>
