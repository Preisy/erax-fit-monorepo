<script setup lang="ts">
import { SInput } from 'shared/ui/SInput';
import { ETrainingCardProps } from './ETrainingCard.vue';
const props = defineProps<{
  info: ETrainingCardProps['info'];
}>();

const keys: Array<keyof typeof props.info> = ['weight', 'sets', 'repeats', 'rest', 'temp'];
</script>

<template>
  <div flex flex-row flex-wrap gap-0.5rem>
    <SInput
      v-for="prop in keys"
      :key="prop"
      :name="prop"
      input-class="text-md! fw-800 text-center pt-1rem!"
      readonly
      centered
      display-block
      h-5rem
      w-7rem
      :label="$t(`dashboard.trainings.infoBlock.${prop}`)"
      :model-value="`${info[prop]}`"
    />
  </div>
</template>
