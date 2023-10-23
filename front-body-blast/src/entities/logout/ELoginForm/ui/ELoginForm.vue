<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { AuthDto } from 'shared/api/auth';
import { SBtn } from 'shared/ui/SBtn';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const submit = (data: Record<string, unknown>) => console.log(data);
const schema = toTypedSchema(AuthDto.validation());
</script>

<template>
  <SForm :action="submit" :field-schema="schema">
    <SInput name="email" :label="$t('logout.login.fields.email')" />
    <SInput name="password" :label="$t('logout.login.fields.password')" />

    <template #submit-btn>
      <div fixed bottom-1rem left-1rem right-1rem flex justify-between>
        <SBtn bg="bg!" boxshadow-btn>
          <p fw-800 normal-case>{{ $t('logout.login.controls.forget') }}</p>
        </SBtn>
        <SBtn type="submit" boxshadow-btn>
          <q-icon name="done" />
        </SBtn>
      </div>
    </template>
  </SForm>
</template>
