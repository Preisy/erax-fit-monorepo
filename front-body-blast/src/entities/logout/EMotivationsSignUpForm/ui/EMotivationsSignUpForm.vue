<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { MotivationsDto } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const schema = toTypedSchema(MotivationsDto.validation());
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="loadRestrictions" :label="$t('logout.signUp.motivations.fields.loadRestrictions')" />
    <SInput name="sportExperience" :label="$t('logout.signUp.motivations.fields.sportExperience')" />
    <SInput name="targets" :label="$t('logout.signUp.motivations.fields.targets')" />
  </SForm>
</template>
