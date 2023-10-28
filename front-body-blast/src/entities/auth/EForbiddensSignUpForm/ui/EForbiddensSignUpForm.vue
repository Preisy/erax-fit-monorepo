<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Forbiddens, useAuthStore } from 'shared/api/auth';
import { SForm, useHandlerWrapper } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const forbiddensState = ref(authStore.forbiddensState);
const onsubmit = useHandlerWrapper(authStore.sendForbiddens);

const schema = toTypedSchema(Forbiddens.validation());
</script>
<template>
  <SForm :loading="forbiddensState.state.isLoading()" @submit="onsubmit" :field-schema="schema">
    <SInput name="diet" :label="$t('auth.signUp.forbiddens.fields.diet')" />
    <SInput name="allergic" :label="$t('auth.signUp.forbiddens.fields.allergic')" />
    <SInput name="intolerance" :label="$t('auth.signUp.forbiddens.fields.intolerance')" />
  </SForm>
</template>
