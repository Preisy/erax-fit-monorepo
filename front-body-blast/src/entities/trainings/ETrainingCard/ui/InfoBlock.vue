<script setup lang="ts">
import { SReadonlyField } from 'shared/ui/Inputs';
import { ETrainingCardProps } from './ETrainingCard.vue';
const props = defineProps<{
  info: ETrainingCardProps['training']['info'];
}>();

const keys: Array<keyof typeof props.info> = ['weight', 'sets', 'repeats', 'rest', 'temp'];
</script>

<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SReadonlyField
      v-for="prop in keys"
      :key="prop"
      :title="$t(`dashboard.trainings.infoBlock.${prop}`)"
      :value="`${info[prop]}`"
    />
  </div>
</template>
