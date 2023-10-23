<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { BodyParamsDto } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const schema = toTypedSchema(BodyParamsDto.validation());
</script>

<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="age" :label="$t('logout.signUp.bodyParams.fields.age')" />
    <SInput name="weight" :label="$t('logout.signUp.bodyParams.fields.weight')" />
    <SInput name="teenAgeWeight" :label="$t('logout.signUp.bodyParams.fields.teenAgeWeight')" />
  </SForm>
</template>
