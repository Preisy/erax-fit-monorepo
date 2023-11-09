<script setup lang="ts">
import { SReadonlyField } from 'shared/ui/SReadonlyField';

const props = defineProps<{
  weight: string | number;
  sets: string | number;
  repetitions: string | number;
  restTime: string | number;
  pace: string | number;
}>();

const keys: Array<keyof typeof props> = ['weight', 'sets', 'repetitions', 'restTime', 'pace'];
</script>

<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SReadonlyField
      v-for="prop in keys"
      :key="prop"
      :title="$t(`dashboard.trainings.infoBlock.${prop}`)"
      :value="`${$props[prop]}`"
    />
  </div>
</template>
