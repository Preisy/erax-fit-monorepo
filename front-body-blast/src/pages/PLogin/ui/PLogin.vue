<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { z } from 'zod';
import { FForm, FFormProps } from 'features/FForm';
import { SStructure } from 'shared/ui/SStructure';
import { login } from '../api';

const form: FFormProps = {
  fields: [
    {
      name: 'email',
      rule: z.string().email(),
      sInputOptions: { label: 'Почта', autocomplete: 'user-email' },
    },
    {
      name: 'password',
      rule: z.string(),
      sInputOptions: { label: 'Пароль', type: 'password', autocomplete: 'current-password' },
    },
  ],
  action: login.login,
};
</script>

<template>
  <SStructure h- relative flex items-center justify-center>
    <FForm :fields="form.fields" :action="form.action" w-full />
  </SStructure>
</template>
