<script setup lang="ts">
import { SInput } from 'shared/ui/Inputs';
</script>

<template>
  <SInput name="loadRestrictions" :label="$t('auth.signUp.motivations.fields.loadRestrictions')" />
  <SInput name="sportExperience" :label="$t('auth.signUp.motivations.fields.sportExperience')" />
  <SInput name="targets" :label="$t('auth.signUp.motivations.fields.targets')" />
</template>
