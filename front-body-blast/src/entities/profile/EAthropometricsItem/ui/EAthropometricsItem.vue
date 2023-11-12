<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { Profile } from 'shared/api/profile';
import { SInput } from 'shared/ui/inputs';
import { SForm } from 'shared/ui/SForm';

export interface EAthropometricsItemProps {
  readonly: boolean;
  profile: Profile.Athropometrics;
}

const schema = toTypedSchema(Profile.validation());
const fields: (keyof Profile.Athropometrics)[] = ['weight', 'waist', 'underbelly', 'shoulder', 'hip', 'hipVolume'];

defineProps<EAthropometricsItemProps>();
</script>

<template>
  <SForm :readonly="readonly" :field-schema="schema" class="[&_.s-form-inputs]:(grid grid-cols-2 mt-8 gap-2)">
    <SInput
      v-for="field of fields"
      :key="field"
      :name="field"
      :label="$t(`home.profile.athropometrics.${field}`)"
      centered
      :readonly="readonly"
      :model-value="String(profile[field])"
    />
  </SForm>
</template>
