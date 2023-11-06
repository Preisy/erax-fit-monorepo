<script setup lang="ts">
import { SInput } from 'shared/ui/inputs';
</script>

<template>
  <SInput name="username" :label="$t('auth.signUp.credentials.fields.username')" />
  <SInput name="email" :label="$t('auth.signUp.credentials.fields.email')" />
  <SInput name="password" :label="$t('auth.signUp.credentials.fields.password')" />
  <SInput name="passwordRepeat" :label="$t('auth.signUp.credentials.fields.passwordRepeat')" />
</template>
