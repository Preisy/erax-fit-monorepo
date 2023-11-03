<script setup lang="ts">
import { SInput } from 'shared/ui/Inputs';
</script>

<template>
  <SInput name="diet" :label="$t('auth.signUp.forbiddens.fields.diet')" />
  <SInput name="allergic" :label="$t('auth.signUp.forbiddens.fields.allergic')" />
  <SInput name="intolerance" :label="$t('auth.signUp.forbiddens.fields.intolerance')" />
</template>
