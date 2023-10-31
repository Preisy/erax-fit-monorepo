<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Diseases, useAuthStore } from 'shared/api/auth';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const diseasesState = ref(authStore.diseasesState);
const sendDiseases = authStore.sendDiseases;

const schema = toTypedSchema(Diseases.validation());
</script>

<template>
  <SForm :loading="diseasesState.state.isLoading()" :action="sendDiseases" :field-schema="schema">
    {{ diseasesState }}
    <SInput name="gastrointestinalDiseases" :label="$t('logout.signUp.diseases.fields.gastrointestinalDiseases')" />
    <SInput name="insulinResistance" :label="$t('logout.signUp.diseases.fields.insulinResistance')" />
    <SInput name="kidneyDisease" :label="$t('logout.signUp.diseases.fields.kidneyDisease')" />
    <SInput name="diseasesCVD" :label="$t('logout.signUp.diseases.fields.diseasesCVD')" />
    <SInput name="diseasesODA" :label="$t('logout.signUp.diseases.fields.diseasesODA')" />
  </SForm>
</template>
