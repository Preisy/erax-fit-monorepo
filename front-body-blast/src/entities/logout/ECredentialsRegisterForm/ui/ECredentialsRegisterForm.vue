<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = () => console.log('aboba');
const schema = toTypedSchema(
  z
    .object({
      username: z.string().min(3).max(50),
      email: z.string().email(),
      password: z.string().min(6).max(30),
      password_repeat: z.string().min(6).max(30),
    })
    .superRefine(({ password_repeat, password }, ctx) => {
      if (password_repeat !== password) {
        ctx.addIssue({
          code: 'custom',
          message: 'The passwords did not match',
        });
      }
    }),
);
</script>
<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="username" label="Имя и фамилия" />
    <SInput name="email" label="Почта" />
    <SInput name="password" label="Пароль" />
    <SInput name="password_repeat" label="Повторите пароль" />
  </SForm>
</template>
