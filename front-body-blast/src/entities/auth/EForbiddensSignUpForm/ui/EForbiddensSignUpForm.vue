<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Forbiddens, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const forbiddensState = ref(authStore.forbiddensState);
const sendForbiddens = authStore.sendForbiddens;

const schema = toTypedSchema(Forbiddens.validation());
</script>
<template>
  <SForm :loading="forbiddensState.state.isLoading()" :action="sendForbiddens" :field-schema="schema">
    <SInput name="diet" :label="$t('auth.signUp.forbiddens.fields.diet')" />
    <SInput name="allergic" :label="$t('auth.signUp.forbiddens.fields.allergic')" />
    <SInput name="intolerance" :label="$t('auth.signUp.forbiddens.fields.intolerance')" />
  </SForm>
</template>
