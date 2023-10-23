<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { ForbiddensDto } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const schema = toTypedSchema(ForbiddensDto.validation());
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="diet" :label="$t('logout.signUp.forbiddens.fields.diet')" />
    <SInput name="allergic" :label="$t('logout.signUp.forbiddens.fields.allergic')" />
    <SInput name="intolerance" :label="$t('logout.signUp.forbiddens.fields.intolerance')" />
  </SForm>
</template>
