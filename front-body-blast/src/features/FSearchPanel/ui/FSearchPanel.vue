<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SBtn } from 'shared/ui/SBtn';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

const action = (data: unknown) => console.log(data);
const schema = toTypedSchema(
  z.object({
    query: z.string().min(5),
  }),
);
</script>
<template>
  <SForm :action="action" :field-schema="schema" flex flex-row gap-x-0.5rem class="[&_.s-form-inputs]:w-full">
    <SInput name="query" w-full :label="$t('admin.profile.search.label')" />
    <template #submit-btn>
      <SBtn icon="sym_r_search" />
    </template>
  </SForm>
</template>
