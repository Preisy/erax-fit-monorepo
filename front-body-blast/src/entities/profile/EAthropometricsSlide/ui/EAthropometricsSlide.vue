<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';

import { Athropometrics } from 'shared/api/profile';
import { SForm } from 'shared/ui/SForm';
import { SInput } from 'shared/ui/SInput';

export interface EAthropometricsSlideProps {
  editable: boolean;
  tdate: string;
  weight?: number;
  waist?: number;
  underbelly?: number;
  shoulder?: number;
  hip?: number;
  hipVolume?: number;
}

const fields = {
  weight: 'Вес',
  waist: 'Талия',
  underbelly: 'Низ живота',
  shoulder: 'Плечо',
  hip: 'Бедро',
  hipVolume: 'Объем бедер',
};

defineProps<EAthropometricsSlideProps>();

const schema = toTypedSchema(Athropometrics.validation());
</script>

<template>
  <SForm v-if="editable" :action="() => {}" :field-schema="schema" class="[&>div]:(grid grid-cols-2 mt-8 gap-2)">
    <SInput v-for="(value, key) in fields" :key="key" :name="key" :label="value" :value="weight" centered />
  </SForm>
  <div v-else grid grid-cols-2 mt-8 gap-2>
    <div
      class="relative rounded-1rem bg-primary px-6 py-4 text-center text-bg"
      v-for="(value, key) in fields"
      :key="key"
    >
      <p class="ellipsis absolute left-1/2 scale-3/4 -translate-x-1/2 -translate-y-1/3">{{ value }}</p>
      <p class="pt-2 font-600">{{ $.props[key] || '-' }}</p>
    </div>
  </div>
</template>
