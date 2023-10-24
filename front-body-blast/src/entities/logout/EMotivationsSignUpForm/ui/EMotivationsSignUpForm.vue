<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Motivations, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const motivationsState = ref(authStore.motivationsState);
const sendMotivations = authStore.sendMotivations;

const schema = toTypedSchema(Motivations.validation());
</script>
<template>
  <SForm :loading="motivationsState.state.isLoading()" :action="sendMotivations" :field-schema="schema">
    {{ motivationsState }}
    <SInput name="loadRestrictions" :label="$t('logout.signUp.motivations.fields.loadRestrictions')" />
    <SInput name="sportExperience" :label="$t('logout.signUp.motivations.fields.sportExperience')" />
    <SInput name="targets" :label="$t('logout.signUp.motivations.fields.targets')" />
  </SForm>
</template>
