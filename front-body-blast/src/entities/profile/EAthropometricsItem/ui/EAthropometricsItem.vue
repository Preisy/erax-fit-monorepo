<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { Profile } from 'shared/api/profile';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

export interface EAthropometricsItemProps {
  readonly: boolean;
  profile: Profile.Athropometrics;
}

const schema = toTypedSchema(Profile.validation());
const fields: (keyof Profile.Athropometrics)[] = ['weight', 'waist', 'underbelly', 'shoulder', 'hip', 'hipVolume'];

defineProps<EAthropometricsItemProps>();
</script>

<template>
  <SForm :action="() => {}" :field-schema="schema" class="[&>div]:(grid grid-cols-2 mt-8 gap-2)">
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
