<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput name="age" :label="$t('auth.signUp.bodyParams.fields.age')" />
  <SInput name="weight" :label="$t('auth.signUp.bodyParams.fields.weight')" />
  <SInput name="teenAgeWeight" :label="$t('auth.signUp.bodyParams.fields.teenAgeWeight')" />
</template>
