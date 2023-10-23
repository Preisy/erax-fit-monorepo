<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import { SignUpDto } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const { t } = useI18n();
const passwordsMismatchErrorMessage = t('logout.signUp.credentials.errors.passwordMismatch');
const validationSchema = toTypedSchema(SignUpDto.validationSchemaRefined(passwordsMismatchErrorMessage));
</script>
<template>
  <SForm :action="submit" :field-schema="validationSchema">
    <SInput name="username" :label="$t('logout.signUp.credentials.fields.username')" />
    <SInput name="email" :label="$t('logout.signUp.credentials.fields.email')" />
    <SInput name="password" :label="$t('logout.signUp.credentials.fields.password')" />
    <SInput name="passwordRepeat" :label="$t('logout.signUp.credentials.fields.passwordRepeat')" />
  </SForm>
</template>
