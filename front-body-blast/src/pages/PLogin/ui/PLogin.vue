<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { ELoginForm } from 'entities/profile/form';
import { Auth, useAuthStore } from 'shared/api/auth';
import { SBtn } from 'shared/ui/btns';
import { SForm } from 'shared/ui/SForm';
import { SStructure } from 'shared/ui/SStructure';

const schema = toTypedSchema(Auth.validation());
const authStore = useAuthStore();
</script>

<template>
  <SStructure relative mt--6.5rem h-screen flex items-center justify-center>
    <SForm :field-schema="schema" @submit="authStore.login" :loading="authStore.loginState.state.isLoading()" w-full>
      <ELoginForm />
      <template #submit-btn>
        <div absolute bottom-1rem left-0rem right-0rem flex justify-between>
          <SBtn bg="bg!" boxshadow-btn>
            <p fw-800 normal-case>{{ $t('auth.login.controls.forget') }}</p>
          </SBtn>
          <SBtn :loading="authStore.loginState.state.isLoading()" icon="done" type="submit" boxshadow-btn />
        </div>
      </template>
    </SForm>
  </SStructure>
</template>
