<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { BodyParams, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const bodyParamsState = ref(authStore.bodyParamsState);
const sendBodyParams = authStore.sendBodyParams;

const schema = toTypedSchema(BodyParams.validation());
</script>

<template>
  <SForm :loading="bodyParamsState.state.isLoading()" :action="sendBodyParams" :field-schema="schema">
    {{ bodyParamsState }}
    <SInput name="age" :label="$t('logout.signUp.bodyParams.fields.age')" />
    <SInput name="weight" :label="$t('logout.signUp.bodyParams.fields.weight')" />
    <SInput name="teenAgeWeight" :label="$t('logout.signUp.bodyParams.fields.teenAgeWeight')" />
  </SForm>
</template>
