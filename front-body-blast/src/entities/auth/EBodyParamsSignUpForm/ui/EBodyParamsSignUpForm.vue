<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { BodyParams, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const bodyParamsState = ref(authStore.bodyParamsState);
const schema = toTypedSchema(BodyParams.validation());
const { sendBodyParams } = authStore;
</script>

<template>
  <SForm :loading="bodyParamsState.state.isLoading()" @submit="sendBodyParams" :field-schema="schema">
    <SInput name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
    <SInput name="weight" :label="$t('auth.signUp.bodyParams.fields.weight')" />
    <SInput name="teenAgeWeight" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
  </SForm>
</template>
