<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';
</script>

<template>
  <SInput name="email" :label="$t('auth.login.fields.email')" />
  <SInput name="password" :label="$t('auth.login.fields.password')" />
</template>
