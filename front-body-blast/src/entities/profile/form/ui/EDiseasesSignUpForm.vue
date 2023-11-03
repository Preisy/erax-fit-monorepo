<script setup lang="ts">
import { SInput } from 'shared/ui/Inputs';
</script>

<template>
  <SInput name="gastrointestinalDiseases" :label="$t('auth.signUp.diseases.fields.gastrointestinalDiseases')" />
  <SInput name="insulinResistance" :label="$t('auth.signUp.diseases.fields.insulinResistance')" />
  <SInput name="kidneyDisease" :label="$t('auth.signUp.diseases.fields.kidneyDisease')" />
  <SInput name="diseasesCVD" :label="$t('auth.signUp.diseases.fields.diseasesCVD')" />
  <SInput name="diseasesODA" :label="$t('auth.signUp.diseases.fields.diseasesODA')" />
</template>
