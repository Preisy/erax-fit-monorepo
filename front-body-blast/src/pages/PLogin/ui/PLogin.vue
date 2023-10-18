<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { z } from 'zod';
import { FForm, FFormProps } from 'features/FForm';
import { SBtn } from 'shared/ui/SBtn';
import { SStructure } from 'shared/ui/SStructure';
import { login } from '../api';

const form: FFormProps = {
  fields: [
    {
      name: 'email',
      rule: z.string().email(),
      sInputOptions: { label: 'Почта' },
    },
    {
      name: 'password',
      rule: z.string(),
      sInputOptions: { label: 'Пароль', type: 'password' },
    },
  ],
  action: login.login,
};

const click = () => console.log('click');
</script>

<template>
  <SStructure relative h-screen flex items-center justify-center>
    <FForm :fields="form.fields" :action="form.action" w-full />

    <!-- <SBtn :action="click" type="submit" fixed bottom-1rem right-15px>
      <q-icon name="done" />
    </SBtn> -->
  </SStructure>
</template>
