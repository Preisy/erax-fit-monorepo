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
const passwordsMismatchErrorMessage = t('logout.signUp.credentials.errors.passwordMismatch');
const validationSchema = toTypedSchema(SignUp.validationRefined(passwordsMismatchErrorMessage));
</script>

<template>
  <SForm :loading="signUpState.state.isLoading()" :action="signUp" :field-schema="validationSchema">
    {{ signUpState }}
    <SInput name="username" :label="$t('logout.signUp.credentials.fields.username')" />
    <SInput name="email" :label="$t('logout.signUp.credentials.fields.email')" />
    <SInput name="password" :label="$t('logout.signUp.credentials.fields.password')" />
    <SInput name="passwordRepeat" :label="$t('logout.signUp.credentials.fields.passwordRepeat')" />
  </SForm>
</template>
