<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { Profile } from 'shared/api/profile';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

export interface EAthropometricsSlideProps {
  editable: boolean;
  tdate: string;
  profile: Profile.Athropometrics;
}

const schema = toTypedSchema(Profile.validation());
const fields: (keyof Profile.Athropometrics)[] = ['weight', 'waist', 'underbelly', 'shoulder', 'hip', 'hipVolume'];

defineProps<EAthropometricsSlideProps>();
</script>

<template>
  <SForm v-if="editable" :action="() => {}" :field-schema="schema" class="[&>div]:(grid grid-cols-2 mt-8 gap-2)">
    <SInput
      v-for="field of fields"
      :key="field"
      :name="field"
      :label="$t(`home.profile.athropometrics.${field}`)"
      centered
    />
  </SForm>
  <div v-else grid grid-cols-2 mt-8 gap-2>
    <div class="relative rounded-1rem bg-primary px-6 py-4 text-center text-bg" v-for="field of fields" :key="field">
      <p class="ellipsis absolute left-1/2 scale-3/4 -translate-x-1/2 -translate-y-1/3">
        {{ $t(`home.profile.athropometrics.${field}`) }}
      </p>
      <p class="pt-2 font-600">{{ profile[field] || '-' }}</p>
    </div>
  </div>
</template>
