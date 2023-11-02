<script setup lang="ts">
import { SReadonlyField } from 'shared/ui/SReadonlyField';
import { ETrainingCardProps } from './ETrainingCard.vue';
const props = defineProps<{
  info: ETrainingCardProps['info'];
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
