<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';
</script>

<template>
  <SInput name="username" :label="$t('auth.signUp.credentials.fields.username')" />
  <SInput name="email" autocomplete="email" :label="$t('auth.signUp.credentials.fields.email')" />
  <SInput
    name="password"
    type="password"
    autocomplete="password"
    :label="$t('auth.signUp.credentials.fields.password')"
  />
  <SInput
    name="passwordRepeat"
    type="password"
    autocomplete="password-repeat"
    :label="$t('auth.signUp.credentials.fields.passwordRepeat')"
  />
</template>
