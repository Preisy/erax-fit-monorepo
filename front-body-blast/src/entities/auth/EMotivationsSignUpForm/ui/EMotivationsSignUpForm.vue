<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Motivations, useAuthStore } from 'shared/api/auth';
import { SForm, useHandlerWrapper } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const motivationsState = ref(authStore.motivationsState);
const onsubmit = useHandlerWrapper(authStore.sendMotivations);

const schema = toTypedSchema(Motivations.validation());
</script>
<template>
  <SForm :loading="motivationsState.state.isLoading()" @submit="onsubmit" :field-schema="schema">
    <SInput name="loadRestrictions" :label="$t('auth.signUp.motivations.fields.loadRestrictions')" />
    <SInput name="sportExperience" :label="$t('auth.signUp.motivations.fields.sportExperience')" />
    <SInput name="targets" :label="$t('auth.signUp.motivations.fields.targets')" />
  </SForm>
</template>
