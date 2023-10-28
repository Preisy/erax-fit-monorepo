<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Diseases, useAuthStore } from 'shared/api/auth';
import { SForm, useHandlerWrapper } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const diseasesState = ref(authStore.diseasesState);
const onsubmit = useHandlerWrapper(authStore.sendDiseases);

const schema = toTypedSchema(Diseases.validation());
</script>
<template>
  <SForm :loading="diseasesState.state.isLoading()" @submit="onsubmit" :field-schema="schema">
    <SInput name="gastrointestinalDiseases" :label="$t('auth.signUp.diseases.fields.gastrointestinalDiseases')" />
    <SInput name="insulinResistance" :label="$t('auth.signUp.diseases.fields.insulinResistance')" />
    <SInput name="kidneyDisease" :label="$t('auth.signUp.diseases.fields.kidneyDisease')" />
    <SInput name="diseasesCVD" :label="$t('auth.signUp.diseases.fields.diseasesCVD')" />
    <SInput name="diseasesODA" :label="$t('auth.signUp.diseases.fields.diseasesODA')" />
  </SForm>
</template>
