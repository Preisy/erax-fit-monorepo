<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { SBtn } from 'shared/ui/Btns';
import { SInput } from 'shared/ui/Inputs';
import { SForm } from 'shared/ui/SForm';

export interface FSearchPanelProps {
  query: string;
}
defineProps<FSearchPanelProps>();
const emit = defineEmits<{
  (e: 'update:query', newValue: string | null | undefined): void;
}>();
//TODO: вынести схему наружу
const validation = z.object({
  query: z.string().default('').nullable().optional(),
});
const schema = toTypedSchema(validation);
const action = (data: (typeof validation)['_type']) => emit('update:query', data.query);
</script>

<template>
  <SForm :action="action" :field-schema="schema" flex="~ row!" gap-x-0.5rem class="[&_.s-form-inputs]:w-full">
    <SInput name="query" w-full :label="$t('admin.profile.search.label')" />
    <template #submit-btn>
      <SBtn icon="sym_r_search" type="submit" />
    </template>
  </SForm>
</template>
