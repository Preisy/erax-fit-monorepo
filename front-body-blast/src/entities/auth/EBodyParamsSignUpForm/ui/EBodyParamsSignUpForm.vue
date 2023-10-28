<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { BodyParams, useAuthStore } from 'shared/api/auth';
import { SForm, useHandlerWrapper } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const bodyParamsState = ref(authStore.bodyParamsState);
const schema = toTypedSchema(BodyParams.validation());
const onsubmit = useHandlerWrapper(authStore.sendBodyParams);
</script>

<template>
  <SForm :loading="bodyParamsState.state.isLoading()" @submit="onsubmit" :field-schema="schema">
    <SInput name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
    <SInput name="weight" :label="$t('auth.signUp.bodyParams.fields.weight')" />
    <SInput name="teenAgeWeight" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
  </SForm>
</template>
