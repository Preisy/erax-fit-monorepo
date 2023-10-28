<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import { SignUp, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const signUpState = ref(authStore.signUpState);
const signUp = authStore.signUp;

const { t } = useI18n();
const passwordsMismatchErrorMessage = t('auth.signUp.credentials.errors.passwordMismatch');
const validationSchema = toTypedSchema(SignUp.validationRefined(passwordsMismatchErrorMessage));
</script>
<template>
  <SForm :loading="signUpState.state.isLoading()" :action="signUp" :field-schema="validationSchema">
    <SInput name="username" :label="$t('auth.signUp.credentials.fields.username')" />
    <SInput name="email" :label="$t('auth.signUp.credentials.fields.email')" />
    <SInput name="password" :label="$t('auth.signUp.credentials.fields.password')" />
    <SInput name="passwordRepeat" :label="$t('auth.signUp.credentials.fields.passwordRepeat')" />
  </SForm>
</template>
