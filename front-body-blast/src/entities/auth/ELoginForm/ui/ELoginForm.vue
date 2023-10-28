<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { Auth, useAuthStore } from 'shared/api/auth';
import { SBtn } from 'shared/ui/SBtn';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const authStore = useAuthStore();
const loginState = ref(authStore.loginState);

const { login } = authStore;
const schema = toTypedSchema(Auth.validation());
</script>

<template>
  <SForm @submit="login" :field-schema="schema">
    <SInput name="email" :label="$t('auth.login.fields.email')" />
    <SInput name="password" :label="$t('auth.login.fields.password')" />

    <template #submit-btn>
      <div absolute bottom-1rem left-0rem right-0rem flex justify-between>
        <SBtn bg="bg!" boxshadow-btn>
          <p fw-800 normal-case>{{ $t('auth.login.controls.forget') }}</p>
        </SBtn>
        <SBtn :loading="loginState.state.isLoading()" icon="done" type="submit" boxshadow-btn />
      </div>
    </template>
  </SForm>
</template>
