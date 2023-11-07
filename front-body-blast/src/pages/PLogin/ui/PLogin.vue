<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { ELoginForm } from 'entities/profile/form';
import { Auth, TokenService, useAuthStore } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/SBtn';
import { SForm } from 'shared/ui/SForm';
import { SStructure } from 'shared/ui/SStructure';

const schema = toTypedSchema(Auth.validation());
const authStore = useAuthStore();
const { loginState } = authStore;
const router = useRouter();
watch(loginState, (updated) => {
  // if auth fails -> return
  if (!updated.state.isSuccess() || !loginState.data) return;
  if (!router) return;

  // if auth successful -> set cookies, reroute
  TokenService.setTokens(loginState.data);
  router.push({ name: ENUMS.ROUTES_NAMES.TRAINING });
  console.log(`isAuth: ${authStore.isAuth()}`);
});
</script>

<template>
  <SStructure relative mt--6.5rem class="h-[calc(100vh-4rem)]" flex items-center justify-center>
    <SForm :field-schema="schema" @submit="authStore.login" :loading="authStore.loginState.state.isLoading()" w-full>
      <ELoginForm />
      <template #submit-btn>
        <div fixed bottom-1rem left-2rem right-2rem flex justify-between>
          <SBtn bg="bg!" boxshadow-btn>
            <p fw-800 normal-case>{{ $t('auth.login.controls.forget') }}</p>
          </SBtn>
          <SBtn :loading="authStore.loginState.state.isLoading()" icon="done" type="submit" boxshadow-btn />
        </div>
      </template>
    </SForm>
  </SStructure>
</template>
